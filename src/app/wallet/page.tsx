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
    <div className="min-h-screen bg-bg-dark text-text-primary">
      {/* Balance Section */}
      <div className="text-center py-12 px-4">
        <p className="text-text-secondary mb-2">Balance</p>
        <h2 className="text-5xl font-bold mb-8">$34,378.44</h2>

        {/* Connect to Chats Button */}
        <button className="bg-brand-green hover:bg-brand-green-soft text-basic-white font-medium py-3 px-8 rounded-full mb-8 transition-colors flex items-center justify-center mx-auto">
          <ChatIcon
            className="mr-2"
            width={20}
            height={20}
            stroke="currentColor"
          />
          Connect to Chats
        </button>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-12">
          <button className="flex-1 max-w-xs bg-bg-dark-gray hover:bg-stroke/20 text-text-primary py-4 px-6 rounded-2xl transition-colors flex items-center justify-center">
            <DownIcon className="mr-3" width={24} height={24} />
            Withdraw
          </button>
          <button className="flex-1 max-w-xs bg-bg-dark-gray hover:bg-stroke/20 text-text-primary py-4 px-6 rounded-2xl transition-colors flex items-center justify-center">
            <UpIcon className="mr-3" width={24} height={24} />
            Receive
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
              className="flex items-center justify-between p-4 bg-bg-dark-gray hover:bg-stroke/10 rounded-2xl transition-colors"
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 ${asset.bgColor} rounded-full flex items-center justify-center text-white text-xl font-bold mr-4`}
                >
                  {asset.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{asset.symbol}</h4>
                  <p className="text-text-secondary text-sm">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
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
