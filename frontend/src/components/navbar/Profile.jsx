import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();
  const recentOrders = [
  {
    id: 'ORD-001',
    name: 'Air Max Sneakers',
    meta: 'Size 42 · Black · Qty 1',
    price: '₹4,299',
    status: 'Delivered',
    emoji: '👟',
  },
  {
    id: 'ORD-002',
    name: 'Wireless Headphones',
    meta: 'Model X Pro · Black · Qty 1',
    price: '₹2,850',
    status: 'In Transit',
    emoji: '🎧',
  },
  {
    id: 'ORD-003',
    name: 'Phone Case Bundle',
    meta: 'Clear + Matte · Set of 2',
    price: '₹649',
    status: 'Processing',
    emoji: '📱',
  },
  {
    id: 'ORD-004',
    name: 'Linen Casual Shirt',
    meta: 'Size L · Olive Green · Qty 1',
    price: '₹1,199',
    status: 'Delivered',
    emoji: '👕',
  },
  {
    id: 'ORD-005',
    name: 'Smart Watch',
    meta: 'Series 7 · Midnight · Qty 1',
    price: '₹8,499',
    status: 'Cancelled',
    emoji: '⌚',
  },
];

const statusStyles = {
  Delivered:   'bg-green-50 text-green-700',
  'In Transit': 'bg-amber-50 text-amber-700',
  Processing:  'bg-blue-50 text-blue-700',
  Cancelled:   'bg-red-50 text-red-500',
};

  return (
    <div className="min-h-screen bg-stone-50 font-['DM_Sans',sans-serif] py-8 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-[280px_1fr] gap-5">

        {/* LEFT SIDEBAR */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center h-fit">
          {/* Avatar */}
          <div className="relative w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-3 border-4 border-stone-50">
            <span className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-white">
              {initials}
            </span>
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-600 rounded-full border-2 border-white" />
          </div>

          <h2 className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-stone-900">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p className="text-xs text-stone-400 mb-3">{currentUser.email}</p>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-blue-700">
            <span className="w-1.5 h-1.5 bg-green-600  rounded-full" />
            Gold Member
          </span>

          {/* Stats */}
          <div className="border-t border-stone-100 my-4" />
          <div className="grid grid-cols-3 gap-2">
            {[['24', 'Orders'], ['5', 'Wishlist'], ['3', 'Reviews']].map(([num, label]) => (
              <div key={label} className="bg-stone-50 rounded-lg p-2 text-center">
                <p className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-stone-900">{num}</p>
                <p className="text-[10px] text-stone-400 tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="border-t border-stone-100 my-4" />
          <nav className="text-left space-y-1">
            {[
              { label: 'Overview', active: true },
              { label: 'My Orders', badge: 2 },
              { label: 'Wishlist' },
              { label: 'Addresses' },
              { label: 'Settings' },
            ].map(({ label, active, badge }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors
                  ${active ? 'bg-stone-100 text-stone-800 font-medium' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'}`}
              >
                {label}
                {badge && (
                  <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">{badge}</span>
                )}
              </div>
            ))}
          </nav>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-4 py-2 text-sm cursor-pointer text-white border border-stone-200 rounded-lg hover:bg-blue-700
             transition-colors bg-blue-600"
          >
            ← Dashboard
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-4">

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <h3 className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-stone-900 mb-4">Recent Orders</h3>
            {/* map your orders here */}

             {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center gap-3 py-3">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-stone-50 flex items-center justify-center text-2xl flex-shrink-0">
            {order.emoji}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">{order.name}</p>
            <p className="text-xs text-stone-400">{order.meta}</p>
          </div>

          {/* Price + Status */}
          <div className="text-right shrink-0">
            <p className="text-sm font-medium text-stone-900">{order.price}</p>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[order.status]}`}>
              {order.status}
            </span>
          </div>
        </div>
      ))}

          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <h3 className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-stone-900 mb-3">Saved Address</h3>
            <div className="relative bg-stone-50 rounded-lg p-3 text-sm text-stone-500 leading-relaxed">
              <span className="absolute top-2 right-3 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Default
              </span>
              <strong className="text-stone-800">Home</strong><br />
              {currentUser.address}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;