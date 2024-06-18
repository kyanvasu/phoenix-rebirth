import { Dialog, Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}
export default function SettingsModal(props: Props) {
  const { isOpen, onClose, children } = props;

  return (
    <Transition.Root show={isOpen} as="div">
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pointer-events-none">
              <Transition.Child
                as="div"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-sm pointer-events-auto h-3/4 flex flex-col shadow-elevation-3 ">
                  <section className="flex-grow overflow-y-auto bg-white">
                    {children}
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
