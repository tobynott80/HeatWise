'use client';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Search from '../components/icons/Search';

export default function FilterList({ setFilter }) {
  const [list, setList] = useState([
    {
      lad19nm: 'Select All',
      lad19cd: 'all',
      checked: true,
      show: true
    }
  ]);

  useEffect(() => {
    function loadData() {
      d3.json(`/api/data/energyCost/search`).then((data) => {
        data = data.map((v) => ({ ...v, checked: false, show: true }));
        data.unshift({
          lad19nm: 'Select All',
          lad19cd: 'all',
          checked: true,
          show: true
        });
        setList(data);
      });
    }

    loadData();
  }, []);

  const doSearch = (e) => {
    let data = [...list];
    data = data.map((v) => {
      if (
        v.lad19nm.toLowerCase().includes(e.target.value.toLowerCase()) ||
        v.lad19cd.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        v.show = true;
      } else {
        v.show = false;
      }
      return v;
    });
    setList(data);
  };

  const selectBox = (e) => {
    if (e.target.value == 'all') {
      if (e.target.checked) {
        setList((l) =>
          l.map((v) => {
            v.checked = v.lad19cd == 'all' ? true : false;
            return v;
          })
        );
        setFilter([]);
      }
    } else {
      let l = [...list];
      if (e.target.checked) {
        l.find((v) => v.lad19cd == e.target.value).checked = e.target.checked;
        l.find((v) => v.lad19cd == 'all').checked = false;
        setList(l);
      } else {
        l.find((v) => v.lad19cd == e.target.value).checked = e.target.checked;
        // Atleast 1 checkboxed - select all
        if (l.filter((v) => v.checked).length < 1) {
          l.find((v) => v.lad19cd == 'all').checked = true;
        }
        setList(l);
      }
      let filter = list
        .filter((v) => v.checked && v.lad19cd != 'all')
        .map((v) => v.lad19cd);
      setFilter(filter);
    }
  };

  return (
    <section className='rounded-md bg-white dark:bg-gray-800 shrink h-full p-2 overflow-auto'>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <Search className={'w-4 h-4 text-gray-500 dark:text-gray-400'} />
        </div>
        <input
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search by Local Authority District...'
          onChange={doSearch}
        />
      </div>

      <div className='space-y-1 p-2 flex flex-col'>
        {list
          .filter((v) => v.show)
          .map((v) => (
            <div
              className='flex'
              key={v.lad19cd}
            >
              <div className='items-center h-5 py-1'>
                <div className='text-sm'>
                  <input
                    type='checkbox'
                    value={v.lad19cd}
                    id={v.lad19cd}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onChange={selectBox}
                    checked={v.checked}
                  />
                  <label
                    className='font-medium text-gray-900 dark:text-gray-300'
                    for={v.lad19cd}
                  >
                    {v.lad19nm}
                  </label>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
