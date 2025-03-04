import { AddressesInterface } from 'src/types';

export const TEST_ADDRESSES: AddressesInterface = {
  core: {
    version:
      '0xee15d07800e2ad4852505c57cd86afea774af02c17388f8bd907de75f915b4f4',
    versionCap:
      '0x590a4011cb649b3878f3ea14b3a78674642a9548d79b7e091ef679574b158a07',
    object:
      '0xb03fa00e2d9f17d78a9d48bd94d8852abec68c19d55e819096b1e062e69bfad1',
    market:
      '0xa7f41efe3b551c20ad6d6cea6ccd0fd68d2e2eaaacdca5e62d956209f6a51312',
    adminCap:
      '0x09689d018e71c337d9db6d67cbca06b74ed92196103624028ccc3ecea411777c',
    coinDecimalsRegistry:
      '0x200abe9bf19751cc566ae35aa58e2b7e4ff688fc1130f8d8909ea09bc137d668',
    obligationAccessStore:
      '0xb7d7e1464936fbdcdd4913308b40335e662401029635289bdb317c7dde9d6c68',
    coins: {
      usdc: {
        id: '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7',
        metaData:
          '0x69b7a7c3c200439c1b5f3b19d7d495d5966d5f08de66c69276152f8db3992ec6',
        treasury: '',
        coinType:
          '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC',
        symbol: 'USDC',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
            feedObject:
              '0x5dec622733a204ca27f5a90d8c2fad453cc6665186fd5dff13a83d0b6c9027ab',
          },
        },
      },
      cetus: {
        id: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b',
        metaData:
          '0x4c0dce55eff2db5419bbd2d239d1aa22b4a400c01bbb648b058a9883989025da',
        treasury: '',
        coinType:
          '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
        symbol: 'CETUS',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'e5b274b2611143df055d6e7cd8d93fe1961716bcd4dca1cad87a83bc1e78c1ef',
            feedObject:
              '0x24c0247fb22457a719efac7f670cdc79be321b521460bd6bd2ccfa9f80713b14',
          },
        },
      },
      wapt: {
        id: '0x3a5143bb1196e3bcdfab6203d1683ae29edd26294fc8bfeafe4aaa9d2704df37',
        metaData:
          '0xc969c5251f372c0f34c32759f1d315cf1ea0ee5e4454b52aea08778eacfdd0a8',
        treasury: '',
        coinType:
          '0x3a5143bb1196e3bcdfab6203d1683ae29edd26294fc8bfeafe4aaa9d2704df37::coin::COIN',
        symbol: 'wAPT',
        decimals: 8,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
            feedObject:
              '0x7c5b7837c44a69b469325463ac0673ac1aa8435ff44ddb4191c9ae380463647f',
          },
        },
      },
      wsol: {
        id: '0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8',
        metaData:
          '0x4d2c39082b4477e3e79dc4562d939147ab90c42fc5f3e4acf03b94383cd69b6e',
        treasury: '',
        coinType:
          '0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN',
        symbol: 'wSOL',
        decimals: 8,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
            feedObject:
              '0x9d0d275efbd37d8a8855f6f2c761fa5983293dd8ce202ee5196626de8fcd4469',
          },
        },
      },
      wbtc: {
        id: '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881',
        metaData:
          '0x5d3c6e60eeff8a05b693b481539e7847dfe33013e7070cdcb387f5c0cac05dfd',
        treasury: '',
        coinType:
          '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN',
        symbol: 'wBTC',
        decimals: 8,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
            feedObject:
              '0x9a62b4863bdeaabdc9500fce769cf7e72d5585eeb28a6d26e4cafadc13f76ab2',
          },
        },
      },
      weth: {
        id: '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5',
        metaData:
          '0x8900e4ceede3363bef086d6b50ca89d816d0e90bf6bc46efefe1f8455e08f50f',
        treasury: '',
        coinType:
          '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
        symbol: 'wETH',
        decimals: 8,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
            feedObject:
              '0x9193fd47f9a0ab99b6e365a464c8a9ae30e6150fc37ed2a89c1586631f6fc4ab',
          },
        },
      },
      wusdc: {
        id: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf',
        metaData:
          '0x4fbf84f3029bd0c0b77164b587963be957f853eccf834a67bb9ecba6ec80f189',
        treasury: '',
        coinType:
          '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
        symbol: 'wUSDC',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
            feedObject:
              '0x5dec622733a204ca27f5a90d8c2fad453cc6665186fd5dff13a83d0b6c9027ab',
          },
        },
      },
      wusdt: {
        id: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c',
        metaData:
          '0xfb0e3eb97dd158a5ae979dddfa24348063843c5b20eb8381dd5fa7c93699e45c',
        treasury: '',
        coinType:
          '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
        symbol: 'wUSDT',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
            feedObject:
              '0x985e3db9f93f76ee8bace7c3dd5cc676a096accd5d9e09e9ae0fb6e492b14572',
          },
        },
      },
      sui: {
        id: '0x0000000000000000000000000000000000000000000000000000000000000002',
        metaData:
          '0x9258181f5ceac8dbffb7030890243caed69a9599d2886d957a9cb7656af3bdb3',
        treasury: '',
        coinType:
          '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI',
        symbol: 'SUI',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard:
            '0xbca474133638352ba83ccf7b5c931d50f764b09550e16612c9f70f1e21f3f594',
          pyth: {
            feed: '23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
            feedObject:
              '0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37',
          },
        },
      },
      afsui: {
        id: '0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc',
        metaData:
          '0x2f9217f533e51334873a39b8026a4aa6919497b47f49d0986a4f1aec66f8a34d',
        treasury: '',
        coinType:
          '0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI',
        symbol: 'afSUI',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
            feedObject:
              '0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37',
          },
        },
      },
      hasui: {
        id: '0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d',
        metaData:
          '0x2c5f33af93f6511df699aaaa5822d823aac6ed99d4a0de2a4a50b3afa0172e24',
        treasury: '',
        coinType:
          '0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI',
        symbol: 'haSUI',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
            feedObject:
              '0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37',
          },
        },
      },
      vsui: {
        id: '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55',
        metaData:
          '0xabd84a23467b33854ab25cf862006fd97479f8f6f53e50fe732c43a274d939bd',
        treasury: '',
        coinType:
          '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT',
        symbol: 'vSUI',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
            feedObject:
              '0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37',
          },
        },
      },
      sca: {
        id: '0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6',
        metaData:
          '0x5d26a1e9a55c88147ac870bfa31b729d7f49f8804b8b3adfdf3582d301cca844',
        treasury: '',
        coinType:
          '0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA',
        symbol: 'SCA',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '7e17f0ac105abe9214deb9944c30264f5986bf292869c6bd8e8da3ccd92d79bc',
            feedObject:
              '0xf6de1d3279a269a597d813cbaca59aa906543ab9a8c64e84a4722f1a20863985',
          },
        },
      },
      sbeth: {
        id: '0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29',
        metaData:
          '0x89b04ba87f8832d4d76e17a1c9dce72eb3e64d372cf02012b8d2de5384faeef0',
        coinType:
          '0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH',
        treasury: '',
        symbol: 'sbETH',
        decimals: 8,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
            feedObject:
              '0x9193fd47f9a0ab99b6e365a464c8a9ae30e6150fc37ed2a89c1586631f6fc4ab',
          },
        },
      },
      fdusd: {
        id: '0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a',
        metaData:
          '0xdebee5265a67c186ed87fe93303d33dfe1de53e3b4fd7d9329c2852860acd3e7',
        treasury: '',
        coinType:
          '0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a::fdusd::FDUSD',
        symbol: 'FDUSD',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'ccdc1a08923e2e4f4b1e6ea89de6acbc5fe1948e9706f5604b8cb50bc1ed3979',
            feedObject:
              '0x5f6583b2b0fe1ecf94aaffeaab8a838794693960cea48c0da282d5f4a24be027',
          },
        },
      },
      deep: {
        id: '0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270',
        metaData:
          '0x6e60b051a08fa836f5a7acd7c464c8d9825bc29c44657fe170fe9b8e1e4770c0',
        treasury: '',
        coinType:
          '0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP',
        symbol: 'DEEP',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '29bdd5248234e33bd93d3b81100b5fa32eaa5997843847e2c2cb16d7c6d9f7ff',
            feedObject:
              '0x8c7f3a322b94cc69db2a2ac575cbd94bf5766113324c3a3eceac91e3e88a51ed',
          },
        },
      },
      fud: {
        id: '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1',
        metaData:
          '0x01087411ef48aaac1eb6e24803213e3a60a03b147dac930e5e341f17a85e524e',
        treasury: '',
        coinType:
          '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD',
        symbol: 'FUD',
        decimals: 5,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '6a4090703da959247727f2b490eb21aea95c8684ecfac675f432008830890c75',
            feedObject:
              '0x4531c3ed0d22f21f5fce882905372006c9aafa30f01db03b789e95a6c50de7b2',
          },
        },
      },
      sbusdt: {
        id: '0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068',
        metaData:
          '0xda61b33ac61ed4c084bbda65a2229459ed4eb2185729e70498538f0688bec3cc',
        treasury: '',
        coinType:
          '0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068::usdt::USDT',
        symbol: 'sbUSDT',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
            feedObject:
              '0x985e3db9f93f76ee8bace7c3dd5cc676a096accd5d9e09e9ae0fb6e492b14572',
          },
        },
      },
      blub: {
        id: '0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0',
        metaData:
          '0xac32b519790cae96c3317457d903d61d04f1bc8f7710096d80fcba72c7a53703',
        treasury: '',
        coinType:
          '0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB',
        symbol: 'BLUB',
        decimals: 2,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '5fc11ffe4975b624be495be038da30e30bee2004d8ae6282b5364577ef4ca92c',
            feedObject:
              '0x246658c3324f2477568c78cca622518fbc6969a004b841d81409d24a7ec39b18',
          },
        },
      },
      sbwbtc: {
        id: '0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b',
        metaData:
          '0x53e1cae1ad70a778d0b450d36c7c2553314ca029919005aad26945d65a8fb784',
        treasury: '',
        coinType:
          '0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC',
        symbol: 'sbwBTC',
        decimals: 8,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
            feedObject:
              '0x9a62b4863bdeaabdc9500fce769cf7e72d5585eeb28a6d26e4cafadc13f76ab2',
          },
        },
      },
      musd: {
        id: '0xe44df51c0b21a27ab915fa1fe2ca610cd3eaa6d9666fe5e62b988bf7f0bd8722',
        metaData:
          '0xc154abd271b24032a2c80d96c1b82109490bb600ed189ef881d8c9467ed44a4f',
        treasury: '',
        coinType:
          '0xe44df51c0b21a27ab915fa1fe2ca610cd3eaa6d9666fe5e62b988bf7f0bd8722::musd::MUSD',
        symbol: 'mUSD',
        decimals: 9,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: '2ee09cdb656959379b9262f89de5ff3d4dfed0dd34c072b3e22518496a65249c',
            feedObject:
              '0x72fbf053d6009a40cff74d9708592bd7b86673a0e7b252077e1aa53390976584',
          },
        },
      },
      ns: {
        id: '0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178',
        metaData:
          '0x279adec041f8ec5c2d419abf2c32713ae7930a9a3a1ff244c88e5ceced40db6e',
        treasury: '',
        coinType:
          '0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS',
        symbol: 'NS',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'bb5ff26e47a3a6cc7ec2fce1db996c2a145300edc5acaabe43bf9ff7c5dd5d32',
            feedObject:
              '0xc6352e1ea55d7b5acc3ed690cc3cdf8007978071d7bfd6a189445018cfb366e0',
          },
        },
      },
      usdy: {
        id: '0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb',
        metaData:
          '0xd8dd6cf839e2367de6e6107da4b4361f44798dd6cf26d094058d94e4cee25e36',
        treasury: '',
        coinType:
          '0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb::usdy::USDY',
        symbol: 'USDY',
        decimals: 6,
        oracle: {
          supra: '',
          switchboard: '',
          pyth: {
            feed: 'e3d1723999820435ebab53003a542ff26847720692af92523eea613a9a28d500',
            feedObject:
              '0x773cb390165e227cbd5bd924edaeff7d33b1b78aac045c4903ed9be7e711741a',
          },
        },
      },
    },
    oracles: {
      xOracle:
        '0x0c09daac413e834f2fe69601c41e836022fa9a185df6b56a80f6bcd8a3ecb8a2',
      xOracleCap:
        '0x1edeae568fde99e090dbdec4bcdbd33a15f53a1ce1f87aeef1a560dedf4b4a90',
      supra: {
        registry: '',
        registryCap: '',
        holder: '',
      },
      switchboard: {
        registry: '',
        registryCap: '',
      },
      pyth: {
        registry:
          '0x352c9600e69ff6469f9fc7cd1d0cd5f88264caa5f8908102a223ce663fbb360c',
        registryCap:
          '0xe4995aaca4e70d4203790fbd22332107131e88b92b81bc976e6fc3a7d5005efd',
        state:
          '0x1f9310238ee9298fb703c3419030b35b22bb1cc37113e3bb5007c99aec79e5b8',
        wormhole:
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        wormholeState:
          '0xaeab97f96cf9877fee2883315d459552b2b921edc16d7ceac6eab944dd88919c',
      },
    },
    packages: {
      coinDecimalsRegistry: {
        id: '0xca5a5a62f01c79a104bf4d31669e29daa387f325c241de4edbe30986a9bc8b0d',
        upgradeCap:
          '0x34e76a945d29f195bc53ca704fa70877d1cf3a5d7bbfdda1b13e633fff13c0f6',
      },
      math: {
        id: '0xad013d5fde39e15eabda32b3dbdafd67dac32b798ce63237c27a8f73339b9b6f',
        upgradeCap:
          '0x3a329598231de02e6135c62284b66005b41cad1d9ab7ca2dc79c08293aba2ec6',
      },
      whitelist: {
        id: '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        upgradeCap:
          '0xf5a22aea23db664f7b69855b6a546747f17c1ec4230319cfc17225e462b05761',
      },
      x: {
        id: '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        upgradeCap:
          '0x3f203f6fff6a69d151e4f1cd931f22b68c489ef2759765662fc7baf673943c9e',
      },
      protocol: {
        id: '0x83bbe0b3985c5e3857803e2678899b03f3c4a31be75006ab03faf268c014ce41',
        upgradeCap:
          '0x38527d154618d1fd5a644b90717fe07cf0e9f26b46b63e9568e611a3f86d5c1a',
      },
      protocolWhitelist: {
        id: '0x4c262d9343dac53ecb28f482a2a3f62c73d0ebac5b5f03d57383d56ff219acdf',
        upgradeCap:
          '0x4a5e88a75039b00988f633f811f58117f31b8627a46bf822aa114d9010049449',
      },
      query: {
        id: '0xbb6e3ffa494b543aa028cf8d3fb894be1a678b5fe710f7bb959df0e3c1acc0e8',
        upgradeCap:
          '0x14220f035f4cfc2ce442c30703fb44d24f00846eb7077907a231a56051a1d9b2',
      },
      supra: { id: '', object: '', upgradeCap: '' },
      pyth: {
        id: '0x1cf913c825c202cbbb71c378edccb9c04723fa07a73b88677b2ef89c6e203a85',
        upgradeCap:
          '0xb1f167889643ff766df31745b6e93b92462d8165b0a4f1b095499e15180370f7',
      },
      switchboard: {
        id: '',
        upgradeCap: '',
      },
      xOracle: {
        id: '0x897ebc619bdb4c3d9e8d86fb85b86cfd5d861b1696d26175c55ed14903a372f6',
        object:
          '0x897ebc619bdb4c3d9e8d86fb85b86cfd5d861b1696d26175c55ed14903a372f6',
        upgradeCap:
          '0x0f928a6b2e26b73330fecaf9b44acfc9800a4a9794d6415c2a3153bc70e3c1f0',
      },
      testCoin: {
        id: '',
        upgradeCap: '',
      },
    },
  },
  spool: {
    id: '0x1742655fe5872dfa6456673f9e38612a4965e6979e6cd7696a7f1225f28bae21',
    adminCap:
      '0xdd8a047cbbf802bfcde5288b8ef1910965d789cc614da11d39af05fca0bd020a',
    object:
      '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
    pools: {
      sweth: {
        id: '0xeec40beccb07c575bebd842eeaabb835f77cd3dab73add433477e57f583a6787',
        rewardPoolId:
          '0x957de68a18d87817de8309b30c1ec269a4d87ae513abbeed86b5619cb9ce1077',
      },
      ssui: {
        id: '0xb9617f83c06ebdeac0a8834782b1015e1cc7ea23739e30c132c4bfb95c37a579',
        rewardPoolId:
          '0xc3206071a8d43212efb6e3b5504f2321f8df97ab122b466c0bc7cfdf398dc13a',
      },
      susdc: {
        id: '0x0b5f5f413bd3799e4052c37311966c77f3a4545eb125d2e93e67a68478021918',
        rewardPoolId:
          '0x85ed6ed72ea97c35dbf0cdc7ed6fbc48d8ec15de9b17c74bf4512df8a6d7f166',
      },
      swusdc: {
        id: '0xf1b383b9cf2e9f515fc69567df1053098f273849d09cd84b0278a773429bd2b2',
        rewardPoolId:
          '0xc71c53ee6505d928ba15bea4fe4f45d98c9c31eced94b72d00a7827d4b7ba3ff',
      },
      swusdt: {
        id: '0xb5567dfa5c7fc17a249e959732664c50713dd8c23db1a11376b27df800c17418',
        rewardPoolId:
          '0x60768b0687ff0235e376a039709a683e4c436098785e473b67b32dbab47b69ab',
      },
      scetus: {
        id: '0xac1bb13bf4472a637c18c2415fb0e3c1227ea2bcf35242e50563c98215bd298e',
        rewardPoolId:
          '0x6835c1224126a45086fc6406adc249e3f30df18d779ca4f4e570e38716a17f3f',
      },
      safsui: {
        id: '0xc568bb4c991258e839aa54802ecda04fcd9838c826bc3b42b40af81b23c458c8',
        rewardPoolId:
          '0x389a3cbeda742b918941bb24fd00e077bad3367484394d6234f8209b9a6aa03d',
      },
      shasui: {
        id: '0x93f3f4499bf89f2d05ddc1f8b15f51701a7c6c4d0ac0b9c3bc99462cbbd8e321',
        rewardPoolId:
          '0x94cee1be7f5ff34193f3aabef0b14142cb28af4d905fe487a9a7d85a15edb6aa',
      },
      svsui: {
        id: '0xa970e9087f80cb59e9299b8e7af7175d977ad6c9af0322aa4440e138fbd7ae00',
        rewardPoolId:
          '0x38eee9699c4fc132a6623e54b865f047df4fc6eb83af807300f44e8f4b235ff0',
      },
    },
    config: '',
  },
  borrowIncentive: {
    id: '0x8fe05c796e779c71e7739dcaecefb8757ff9482f62e419dbd0dd9c35b740054f',
    adminCap:
      '0xc486afa253646f4d381e81d7f1df8aa4723b845a6bb356f69bad635ffefffe2c',
    object:
      '0x8fe05c796e779c71e7739dcaecefb8757ff9482f62e419dbd0dd9c35b740054f',
    query: '0x5fba54ac5862f087112c54c02339623bd245721f5e21ea3330fc8c8afc8f51f4',
    incentivePools:
      '0xcace4f4736229043d9f897667d046370b8a4d6534bfd307787c40b4c9f42514a',
    incentiveAccounts:
      '0x41ff558f580ca0f711910fd6ef687fce9df76ee8e7fc5e150bdfae08e17fae62',
    config:
      '0x9636e7b947b806b9fe438d037f02bb24026c5b2691d2f6bad349c2e117f77cc3',
  },

  vesca: {
    id: '0x1158813b32962c2d22888fae257d5f2365b03631f0cd5d5b912ccdf51ff4e2f2',
    object:
      '0xcfe2d87aa5712b67cad2732edb6a2201bfdf592377e5c0968b7cb02099bd8e21',
    adminCap:
      '0x4d105b16467acca81d18c132cdd1a3cee159920a86c1ef4bdbf2e8d7878500c5',
    tableId:
      '0x0a0b7f749baeb61e3dfee2b42245e32d0e6b484063f0a536b33e771d573d7246',
    table: '0xd3a4632b1080f7d96e1c2487d4dabf2c1196916937c505a69954ac9f393be8d0',
    treasury:
      '0xafa4b6231e49c15a22d641ce33fda761baaf650fa21899dfa2eb1716146e7306',
    config:
      '0x7cbcb0a342179577a117dfdff974cf1ab765d3b571067bf22ddf5f9e3a667922',
  },
  referral: {
    id: '0x1fc417232d747bf8ce9656b8014759cb2fecc31eb4be41b5c5c5d4f73a1313c2',
    object:
      '0x5658d4bf5ddcba27e4337b4262108b3ad1716643cac8c2054ac341538adc72ec',
    adminCap:
      '0xc5dc06b9074291259f2cac460c940012c781c4430e42125c541cc43101c3bcbd',
    referralBindings:
      '0xf63299d58789d99de94092b9011323466e55ca0c1ea1a7a3786a589af46e1c09',
    bindingTableId:
      '0x1c8202b17267ec8d6cf97ca013615354181a04f179570e42601ff2dae19294b1',
    referralRevenuePool:
      '0x6abd852caf90769c1b185cdf636d841673fa95528f0550f018b8a138bd283c07',
    revenueTableId:
      '0x595baa3654c297bff84ab7786a2d250f019cefc66e8df8e89fd9d41e02bd30dd',
    referralTiers:
      '0x962cb903d8d7346190c5204785ccbb91b61086aa764f674c8145df82335cf83e',
    tiersTableId:
      '0xeac755a7a8b7798530905ac79e8c114f19d0f130f6eab012954f08faac29c75d',
    authorizedWitnessList:
      '0xf21b0ed043c9bb70842c0129159f4943dbcc3c9ef2f2f808af65f8be25cfd20e',
    version:
      '0x1bd4b7285f72e11c316b828c7c47b3f4da18dcec9f9b3dba6d8629cbb6f93e5e',
  },
  loyaltyProgram: {
    id: '0xab7c4e6d53ef862a1115d0c381fd33e05f9c206b79f322a54990b1e8c2fe3446',
    object:
      '0xab7c4e6d53ef862a1115d0c381fd33e05f9c206b79f322a54990b1e8c2fe3446',
    rewardPool:
      '0x215e1022037052407e69a5c5938f888078013c924cae97132492719ac2c53ec6',
    userRewardTableId:
      '0x574a11f8a0fbaa05b8f559cb65634e8eb20f26b1ec29e7d58de9167f3cedd0f7',
  },
  scoin: {
    id: '0x826a4934bee9487e558eed603cf42f30cdc4321d6f31083930791b95f903b9f9',
    coins: {
      ssui: {
        coinType:
          '0x88618204de2dfdc2597681a8441ee726b0dc13494c41e319c3264eb7b35fea90::scallop_sui::SCALLOP_SUI',
        metaData: '',
        symbol: '',
        treasury:
          '0x03f1d94a40bd9f5d556bacb5c5245732b185572f6a29b36ad8b555d9a8a24f09',
      },
      ssca: {
        coinType:
          '0x9f64a180373a6b66595025ae16a4ab701f0af1dd5c7ce1ac91dc112e52c2a3f8::scallop_sca::SCALLOP_SCA',
        metaData: '',
        symbol: '',
        treasury:
          '0x1b05d2cd8b20dba19da073a54195fc52d2f438ea19dea0713bae7a7dab308199',
      },
      swusdc: {
        coinType:
          '0xad4d71551d31092230db1fd482008ea42867dbf27b286e9c70a79d2a6191d58d::scallop_wormhole_usdc::SCALLOP_WORMHOLE_USDC',
        treasury:
          '0x50c5cfcbcca3aaacab0984e4d7ad9a6ad034265bebb440f0d1cd688ec20b2548',
        symbol: '',
        metaData:
          '0xdc0595d068621d630f3c7c364dd257f7e3f8079e00c31c8d18755a033c15ae93',
      },
      swusdt: {
        coinType:
          '0xe6e5a012ec20a49a3d1d57bd2b67140b96cd4d3400b9d79e541f7bdbab661f95::scallop_wormhole_usdt::SCALLOP_WORMHOLE_USDT',
        treasury:
          '0x1f02e2fed702b477732d4ad6044aaed04f2e8e586a169153694861a901379df0',
        symbol: '',
        metaData:
          '0x171d0f1ca99d5fefb8b2e40b89899bacdc5417a783906ae119b9cb1c113d59ae',
      },
      sweth: {
        coinType:
          '0x67540ceb850d418679e69f1fb6b2093d6df78a2a699ffc733f7646096d552e9b::scallop_wormhole_eth::SCALLOP_WORMHOLE_ETH',
        treasury:
          '0x4b7f5da0e306c9d52490a0c1d4091e653d6b89778b9b4f23c877e534e4d9cd21',
        symbol: '',
        metaData:
          '0x077d0fd835b559e5b4bb52641f7627ddbf8b200f9b2cf4e28b3514da2a32a4dd',
      },
      safsui: {
        coinType:
          '0x00671b1fa2a124f5be8bdae8b91ee711462c5d9e31bda232e70fd9607b523c88::scallop_af_sui::SCALLOP_AF_SUI',
        treasury:
          '0x55f4dfe9e40bc4cc11c70fcb1f3daefa2bdc330567c58d4f0792fbd9f9175a62',
        symbol: '',
        metaData:
          '0xfd81c4d1b4d9d1b8c522e91121d22e94759386b29eafe1cc3888ca0ebe369b9e',
      },
      shasui: {
        coinType:
          '0x9a2376943f7d22f88087c259c5889925f332ca4347e669dc37d54c2bf651af3c::scallop_ha_sui::SCALLOP_HA_SUI',
        treasury:
          '0x404ccc1404d74a90eb6f9c9d4b6cda6d417fb03189f80d9070a35e5dab1df0f5',
        symbol: '',
        metaData:
          '0x0a2a4a25aac50ac79210d710f93cb22db58bc6ee22f213364dda9a709cab2189',
      },
      svsui: {
        coinType:
          '0xe1a1cc6bcf0001a015eab84bcc6713393ce20535f55b8b6f35c142e057a25fbe::scallop_v_sui::SCALLOP_V_SUI',
        treasury:
          '0xc06688ee1af25abc286ffb1d18ce273d1d5907cd1064c25f4e8ca61ea989c1d1',
        symbol: '',
        metaData:
          '0xa96cc21ddfb6486be4a96cda0c58734e4ddea2a8c04984f9e6121d8fae997ddf',
      },
      swsol: {
        coinType:
          '0x1392650f2eca9e3f6ffae3ff89e42a3590d7102b80e2b430f674730bc30d3259::scallop_wormhole_sol::SCALLOP_WORMHOLE_SOL',
        treasury:
          '0x760fd66f5be869af4382fa32b812b3c67f0eca1bb1ed7a5578b21d56e1848819',
        symbol: '',
        metaData:
          '0xee202d2013fc09453d695c640088ee08f14afc8f1ae26284b4ebbc4712ff1ba5',
      },
      swbtc: {
        coinType:
          '0x2cf76a9cf5d3337961d1154283234f94da2dcff18544dfe5cbdef65f319591b5::scallop_wormhole_btc::SCALLOP_WORMHOLE_BTC',
        treasury:
          '0xe2883934ea42c99bc998bbe0f01dd6d27aa0e27a56455707b1b34e6a41c20baa',
        symbol: '',
        metaData:
          '0x1ba5904dae41699683da767c7a97785a55c51ec1253498c8fe1980169a96523d',
      },
      susdc: {
        coinType:
          '0x854950aa624b1df59fe64e630b2ba7c550642e9342267a33061d59fb31582da5::scallop_usdc::SCALLOP_USDC',
        treasury:
          '0xbe6b63021f3d82e0e7e977cdd718ed7c019cf2eba374b7b546220402452f938e',
        symbol: '',
        metaData:
          '0x763a21eba338e00bc684aaad80491c89eea5f247b59c47df45b17610c9ad58f2',
      },
      ssbeth: {
        coinType:
          '0xb14f82d8506d139eacef109688d1b71e7236bcce9b2c0ad526abcd6aa5be7de0::scallop_sb_eth::SCALLOP_SB_ETH',
        treasury:
          '0xfd0f02def6358a1f266acfa1493d4707ee8387460d434fb667d63d755ff907ed',
        symbol: '',
        metaData:
          '0xdfdd14d53ed8c7ace7cac8a0eecdfa4c2345e15d9efcbd4e1828f81a107cbe2d',
      },
      sfdusd: {
        coinType:
          '0x6711551c1e7652a270d9fbf0eee25d99594c157cde3cb5fbb49035eb59b1b001::scallop_fdusd::SCALLOP_FDUSD',
        treasury:
          '0xdad9bc6293e694f67a5274ea51b596e0bdabfafc585ae6d7e82888e65f1a03e0',
        symbol: '',
        metaData:
          '0xb1529a3b5e5831d19a722493eec19785f613945d3dc984602d44a418f990d73f',
      },
      sdeep: {
        coinType:
          '0x34f0a2e793e1f79ceac72cfe3bb95f65541da449418289ccd12922d16140c882::scallop_deep::SCALLOP_DEEP',
        metaData: '',
        symbol: '',
        treasury:
          '0x71d41465cf2d16fa0206126526bebdf65c8871d1fcfbd0c2237db2306afd67ba',
      },
      sfud: {
        coinType:
          '0x3b23c05f917052255a0b16a534dbd4446911aa4a30bd3497cdf5b736551e7ef8::scallop_fud::SCALLOP_FUD',
        metaData: '',
        symbol: '',
        treasury:
          '0x858c492d51425b922c040c1a389e185b3b00d565e7d72ead1a81dc733104660d',
      },
    },
  },
};
