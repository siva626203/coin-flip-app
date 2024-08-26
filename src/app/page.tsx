import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
import Flip from './component/Flip';
import Header from './component/Header';

function Page() {
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center p-3">
        <div className="flex-grow text-center">
          <Header text={'Coin Flip Game'} />
        </div>
        <ConnectButton />
      </div>
      <Flip />
    </>
  );
}

export default Page;
