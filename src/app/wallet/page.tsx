// Using custom React component
import ChatIcon from '../components/icons/ChatIcon';
import DownIcon from '../components/icons/DownIcon';
import UpIcon from '../components/icons/UpIcon';

interface Asset {
  symbol: string;
  name: string;
  amount: string;
  value: string;
  icon: string;
  bgColor: string;
}

const assets: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: '345.78',
    value: '$2,300.00',
    icon: '⟐',
    bgColor: 'bg-gray-600',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: '456.12',
    value: '$45,000.00',
    icon: '₿',
    bgColor: 'bg-orange-500',
  },
  {
    symbol: 'USDT',
    name: 'BEP-20',
    amount: '234.56',
    value: '$123.000',
    icon: '₮',
    bgColor: 'bg-green-500',
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    amount: '789.01',
    value: '$0.80',
    icon: '◊',
    bgColor: 'bg-gray-700',
  },
  {
    symbol: 'TON',
    name: 'Toncoin',
    amount: '123.45',
    value: '$2.50',
    icon: '💎',
    bgColor: 'bg-blue-500',
  },
];

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary relative overflow-hidden pt-20">
      {/* Main background gradient */}
      <span className="absolute top-0 left-0 w-[40rem] h-[40rem] radial-gradient opacity-40 -translate-x-[20rem] -translate-y-[20rem]"></span>

      {/* Balance Section */}
      <div className="text-center py-12 px-4">
        <p className="text-text-secondary mb-2">Balance</p>
        <h2 className="text-5xl font-bold mb-8">$34,378.44</h2>

        {/* Connect to Chats Button */}
        <button className="bg-gradient-to-r from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] hover:opacity-90 active:opacity-80 focus:opacity-90 text-basic-black font-medium py-3 px-8 rounded-full mb-8 transition-opacity flex items-center justify-center mx-auto relative overflow-hidden group touch-manipulation">
          <ChatIcon
            className="mr-2"
            width={20}
            height={20}
            stroke="currentColor"
          />
          <span>Connect to Chats</span>
        </button>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-12">
          <button className="flex-1 max-w-xs bg-bg-dark-gray hover:bg-stroke/20 active:bg-stroke/30 focus:bg-stroke/20 text-text-primary py-4 px-6 rounded-2xl transition-colors flex items-center justify-center relative overflow-hidden group touch-manipulation">
            <span className="absolute inset-0 radial-gradient-sm opacity-0 group-hover:opacity-20 group-active:opacity-25 group-focus:opacity-20 transition-opacity duration-300"></span>
            <DownIcon className="mr-3 relative z-10" width={24} height={24} />
            <span className="relative z-10">Withdraw</span>
          </button>
          <button className="flex-1 max-w-xs bg-bg-dark-gray hover:bg-stroke/20 active:bg-stroke/30 focus:bg-stroke/20 text-text-primary py-4 px-6 rounded-2xl transition-colors flex items-center justify-center relative overflow-hidden group touch-manipulation">
            <span className="absolute inset-0 radial-gradient-sm opacity-0 group-hover:opacity-20 group-active:opacity-25 group-focus:opacity-20 transition-opacity duration-300"></span>
            <UpIcon className="mr-3 relative z-10" width={24} height={24} />
            <span className="relative z-10">Receive</span>
          </button>
        </div>
      </div>

      {/* Assets Section */}
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">My Assets</h3>
          <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
            <span className="mr-2">All Assets</span>
            <DownIcon />
          </button>
        </div>

        {/* Asset List */}
        <div className="space-y-4">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-bg-dark-gray hover:bg-stroke/10 active:bg-stroke/15 focus:bg-stroke/10 rounded-2xl transition-colors relative overflow-hidden group cursor-pointer touch-manipulation"
              tabIndex={0}
              role="button"
            >
              {/* Card gradient overlay */}
              <span className="absolute inset-0 radial-gradient-soft opacity-0 group-hover:opacity-15 group-active:opacity-20 group-focus:opacity-15 transition-opacity duration-300"></span>
              <div className="flex items-center relative z-10">
                <div
                  className={`w-12 h-12 ${asset.bgColor} rounded-full flex items-center justify-center text-white text-xl font-bold mr-4 relative overflow-hidden`}
                >
                  <span className="absolute inset-0 radial-gradient-sm opacity-30"></span>
                  <span className="relative z-10">{asset.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{asset.symbol}</h4>
                  <p className="text-text-secondary text-sm">{asset.name}</p>
                </div>
              </div>
              <div className="text-right relative z-10">
                <p className="font-semibold text-lg">{asset.amount}</p>
                <p className="text-text-secondary text-sm">{asset.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
