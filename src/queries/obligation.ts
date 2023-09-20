import { SuiKit, SuiTxBlock } from '@scallop-io/sui-kit';
import { PROTOCOL_OBJECT_ID } from '../constants/common';
import type { ScallopAddress } from '../models';
import type { ObligationInterface } from '../types';

export const queryObligation = async (
  obligationId: string,
  scallopAddress: ScallopAddress,
  suiKit: SuiKit
) => {
  const packageId = scallopAddress.get('core.packages.query.id');
  const queryTarget = `${packageId}::obligation_query::obligation_data`;
  const txBlock = new SuiTxBlock();
  txBlock.moveCall(queryTarget, [obligationId]);
  const queryResult = await suiKit.inspectTxn(txBlock);
  return queryResult.events[0].parsedJson as ObligationInterface;
};

export const getObligations = async (ownerAddress: string, suiKit: SuiKit) => {
  const owner = ownerAddress || suiKit.currentAddress();
  const keyObjectRefs = await suiKit.client().getOwnedObjects({
    owner,
    filter: {
      StructType: `${PROTOCOL_OBJECT_ID}::obligation::ObligationKey`,
    },
  });
  const keyIds = keyObjectRefs.data
    .map((ref: any) => ref?.data?.objectId)
    .filter((id: any) => id !== undefined) as string[];
  const keyObjects = await suiKit.getObjects(keyIds);
  const obligations: { id: string; keyId: string }[] = [];
  for (const keyObject of keyObjects) {
    const keyId = keyObject.objectId;
    if (keyObject.content && 'fields' in keyObject.content) {
      const fields = keyObject.content.fields as any;
      const obligationId = fields['ownership']['fields']['of'];
      obligations.push({ id: obligationId, keyId });
    }
  }
  return obligations;
};
