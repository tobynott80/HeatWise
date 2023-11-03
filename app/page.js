import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='text-6xl mb-4'>HEATWISE</div>
        <div className='flex w-full'>
          <div className='grow w-1/2 mx-4 border-4 mb-4 rounded-lg'>
            <p className='mx-2 mt-3 mb-4'>
              The Centre for Integrated Renewable Energy Generation and Supply
              (CIREGS) at Cardiff University's School of Engineereing was
              established in 2008 as a multidisciplinary engineereing research
              group with international expertise in the supply, transmission and
              demand of energy.
            </p>
            <p className='mx-2 mt-3 mb-4'>
              As a result of academic and industry projects funded by EPSRC
              (i.e.{' '}
              <a
                href='https://ukerc.ac.uk/'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                UKERC
              </a>
              ,
              <a
                href='https://gtr.ukri.org/projects?ref=EP%2FS001492%2F1#/tabOverview'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                MISSION
              </a>
              , and
              <a
                href='https://ukerc.ac.uk/'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                {' '}
                Heat Prosumers
              </a>{' '}
              projects), National Grid (
              <a
                href='https://www.zero2050.co.uk/'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                Zero2050 South Wales
              </a>{' '}
              project) and Welsh European Funding Office (
              <a
                href='https://www.flexis.wales/'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                Flexis
              </a>{' '}
              project), we developed a{' '}
              <a
                href='https://www.nature.com/articles/s41597-022-01356-9'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                methodology for estimating spatial and temporal heat demand and
                energy consumption for heating in England & Wales
              </a>
              , along with a{' '}
              <a
                href='https://ukerc.rl.ac.uk/DC/cgi-bin/edc_search.pl?GoButton=Detail&WantComp=165&WantResult=LD&WantText=heat%20demand&'
                className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
              >
                database
              </a>{' '}
              that includes heat demand time series for Lower layer Super Output
              Areas (LSOAs) across England & Wales.
            </p>
            <p className='mx-2 mt-3 mb-4'>
              We intend to use this space to share key results from our research
              on energy demand data in the form of interactive visualisations.
            </p>
          </div>

          <div className='flex flex-col w-1/2 mx-4'>
            <div className='grow h-48 border-4 mb-4 rounded-lg'>
              <h1 className='text-2xl mb-4 mx-4 mt-3 font-bold'>Team</h1>
              <div className='flex w-full'>
                <div className='grow w-1/2 mx-4  mb-4 font-bold'>
                  Researchers
                  <p className='mt-4 font-light'>Alexandre Canet</p>
                  <p className='font-light'>Ali Al-Waleel</p>
                </div>
                <div className='grow w-1/2 mx-4  mb-4 font-bold'>
                  Academics
                  <p className='mt-4'>
                    <a
                      href='https://profiles.cardiff.ac.uk/staff/qadrdanm'
                      className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
                    >
                      Maysam Qadrdan
                    </a>
                  </p>
                  <p>
                    <a
                      href='https://profiles.cardiff.ac.uk/staff/jenkinsn6'
                      className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
                    >
                      Nick Jenkins
                    </a>
                  </p>
                  <p>
                    <a
                      href='https://profiles.cardiff.ac.uk/staff/wuj5'
                      className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
                    >
                      Jianzhong Wu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className='grow h-48 border-4 mb-4 rounded-lg'>
              <div className='flex w-full'>
                <div className='grow w-1/2 mx-4  mb-4 font-bold'>
                  <Image
                    className='mx-4 mt-4'
                    src='/logos/cardiff_logo.png'
                    width={100}
                    height={0}
                    alt='Cardiff University'
                  />
                  <Image
                    className='mx-4 mt-4'
                    src='/logos/ukri_logo.png'
                    width={100}
                    height={0}
                    alt='UKRI'
                  />
                </div>
                <div className='grow w-1/2 mx-4  mb-4 font-bold'>
                  <Image
                    className='mx-4 mt-4'
                    src='/logos/ukerc_logo.png'
                    width={100}
                    height={0}
                    alt='UKERC'
                  />
                  <Image
                    className='mx-4 mt-4'
                    src='/logos/flexis_logo.png'
                    width={100}
                    height={0}
                    alt='Flexis'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
