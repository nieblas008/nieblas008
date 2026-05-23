'use client';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import MobileMenu from './MobileMenu';

export default function StoreChrome() {
  return (
    <>
      <CartDrawer/>
      <SearchOverlay/>
      <MobileMenu/>
    </>
  );
}
