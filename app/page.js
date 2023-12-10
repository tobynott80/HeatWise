'use client';

import { useRef, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { Transition } from '@headlessui/react';
import { Caveat } from 'next/font/google';

const tabsData = [
  {
    title: 'HeatWise',
    content: (
      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center text-9xl font-bold text-center text-slate-900'>
          HeatWise
          <Image
            src='/logos/logo_map.png'
            alt='HeatWise Logo'
            width={100}
            height={100}
            className='ml-4'
          />
        </div>
        <div className='text-2xl text-center mt-4'>
          Mapping the Future of Energy: Efficient, Integrated, Enlightened
        </div>
      </div>
    )
  },
  {
    title: 'About',
    content: (
      <div className='px-10 py-4'>
        {' '}
        <p className='text-center'>
          The Centre for Integrated Renewable Energy Generation and Supply
          (CIREGS) at Cardiff University's School of Engineering was established
          in 2008 as a multidisciplinary engineering research group with
          international expertise in the supply, transmission and demand of
          energy.
        </p>
        <p className='text-center mt-4'>
          As a result of academic and industry projects funded by EPSRC (i.e.,
          UKERC, MISSION, and Heat Prosumers projects), National Grid (Zero2050
          South Wales project) and Welsh European Funding Office (Flexis
          project), we developed a methodology for estimating spatial and
          temporal heat demand and energy consumption for heating in England &
          Wales, along with a database that includes heat demand time series for
          Lower layer Super Output Areas (LSOAs) across England & Wales.
        </p>
        <p className='text-center mt-4'>
          We intend to use this space to share key results from our research on
          energy demand data in the form of interactive visualisations.
        </p>
      </div>
    )
  },

  {
    title: 'Research',
    content: (
      <div className='flex flex-col items-center justify-center p-4 space-y-4'>
        <div className='flex flex-wrap justify-center items-center space-x-4 space-y-4'>
          <Image
            src='/logos/cardiff_logo.png'
            alt='Cardiff University Logo'
            width={150}
            height={150}
          />
          <Image
            src='/logos/ukri_logo.png'
            alt='UKRI Logo'
            width={150}
            height={150}
          />
          <Image
            src='/logos/flex_logo.png'
            alt='Flex Logo'
            width={150}
            height={150}
          />
          <Image
            src='/logos/ukerc_logo.png'
            alt='UKERC Logo'
            width={150}
            height={150}
          />
        </div>
        <br></br>
        <div className='flex justify-center items-start space-x-10'>
          <div className='text-center'>
            <h3 className='text-xl font-semibold'>Researchers</h3>
            <p>Alexandre Canet</p>
            <p>Ali Al-Waleel</p>
          </div>

          <div className='text-center'>
            <h3 className='text-xl font-semibold'>Academics</h3>
            <p>Maysam Qadrdan</p>
            <p>Nick Jenkins</p>
            <p>Jianzhong Wu</p>
          </div>
        </div>
      </div>
    )
  }
];

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap'
});

export default function UnconventionalTabs({ isSideNavOpen }) {
  const tabsRef = useRef(null);
  const navRef = useRef(null);

  const adjustTabPanelHeight = () => {
    const navBarHeight = navRef.current ? navRef.current.clientHeight : 0;
    const availableHeight =
      window.innerHeight - navBarHeight - (isSideNavOpen ? 60 : 20);

    if (tabsRef.current) {
      tabsRef.current.style.height = `${availableHeight}px`;
    }
  };

  useEffect(() => {
    adjustTabPanelHeight();
    window.addEventListener('resize', adjustTabPanelHeight);

    return () => window.removeEventListener('resize', adjustTabPanelHeight);
  }, [isSideNavOpen]);

  return (
    <Tab.Group>
      {({ selectedIndex }) => (
        <div
          className={`${caveat.variable} flex flex-col h-screen pb-4 pt-4 px-4`}
        >
          <Tab.Panels className='flex-grow pb-4 relative mb-2'>
            {tabsData.map((tab, index) => (
              <Tab.Panel
                key={index}
                as={Fragment}
                static
              >
                <Transition
                  as='article'
                  show={selectedIndex === index}
                  enter='transition-all duration-700 ease-out'
                  enterFrom='opacity-0 translate-y-10 scale-95'
                  enterTo='opacity-100 translate-y-0 scale-100'
                  leave='transition-all duration-700 ease-out'
                  leaveFrom='opacity-100 translate-y-0 scale-100'
                  leaveTo='opacity-0 translate-y-10 scale-95'
                  className='absolute inset-0 flex flex-1 flex-col md:flex-row items-stretch bg-white rounded-2xl shadow-xl focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 p-4'
                >
                  <div className='p-4 text-black w-full h-full flex justify-center items-center'>
                    {tab.content || (
                      <div>
                        <p>
                          Content for the {tab.title} tab will be displayed
                          here.
                        </p>
                      </div>
                    )}
                  </div>
                </Transition>
              </Tab.Panel>
            ))}
          </Tab.Panels>

          <div className='flex justify-center'>
            <Tab.List className='inline-flex flex-wrap justify-center bg-slate-800 rounded-[20px] p-1'>
              {tabsData.map((tab, index) => (
                <Tab
                  key={index}
                  as={Fragment}
                >
                  <button
                    className={`flex-1 text-sm font-medium h-8 px-4 rounded-2xl whitespace-nowrap focus-visible:outline-none ui-focus-visible:outline-none ui-focus-visible:ring ui-focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${
                      selectedIndex === index
                        ? 'bg-white text-black'
                        : 'text-white hover:bg-slate-600'
                    }`}
                  >
                    {tab.title}
                  </button>
                </Tab>
              ))}
            </Tab.List>
          </div>
        </div>
      )}
    </Tab.Group>
  );
}
