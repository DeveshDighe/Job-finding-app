import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/AuthContext';
import { removeUserJobApplication } from '../Toolkit/Reducers/userJobAppliedApp';
import { useDispatch, useSelector } from 'react-redux';
import { removeJobs } from '../Toolkit/Reducers/JobsReducer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { state, dispatch } = useContext(MyContext);
  const navigate = useNavigate();

  const dispatchR = useDispatch();

  
  const navigation = [
    // { name: 'My Lectures', href: '/getLectures', current: false },
    // state?.user?.role === "ADMIN" ? { name: 'Create Course', href: '/createCourse', current: false } : null,
    state?.user?.role === "Admin" ? { name: 'All Apllications', href: '/get-all-jobApplication', current: false } : null,
    { name: 'Home', href: '/', current: false },
    { name: 'My Applicaions', href: '/applied-jobs-applications', current: false },
    { name: 'About Me', href: '#', current: false },
    state?.user?.role === "Admin" ? { name: 'Create Job', href: '/create-job', current: false } : null,
  ].filter(item => item !== null);

  const handleuserClicks = (name, href) => {
    navigate(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('MyToken');
    dispatch({ type: 'REMOVE_USER' });
    dispatchR(removeUserJobApplication())
    dispatchR(removeJobs())
    navigate('/')
  };

  return (
    <Disclosure as="nav" className="bg-blue-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-cartoon-lightning-image_1175078.jpg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <p
                        key={item.name}
                        href={item.href}
                        onClick={() => handleuserClicks(item.name, item.href)}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white cursor-pointer' : 'text-white hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-blue-500 text-sm focus:outline-none font-bold">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <p className="h-8 w-8 rounded-full flex justify-center items-center text-lg">
                        {state?.user?.name ? state.user.name.slice(0, 1).toUpperCase() : "U"}
                      </p>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {state?.user?.name ? (
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              onClick={handleLogout}
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Logout
                            </p>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              onClick={() => navigate('/login')}
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              LogIn
                            </p>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => handleuserClicks(item.name, item.href)}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
