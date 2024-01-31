'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocalStorageHandler } from '@/utils/pipes/storage.pipe';
import { CurrencyFormat } from '@/utils/pipes/currency.pipe';
import { cn } from "@/utils/pipes/classNames.pipe";
import NonSSR from '../non-ssr/NonSSR';
import { Container } from '@/content/Content';

const CART_STORAGE_KEY = 'cart-items';
const CART_INDICATOR_STORAGE_KEY = 'cart-indicator';
const CART_LAST_ITEM_KEY = 'cart-last-item';

const HAS_WINDOW = typeof window !== 'undefined';

type ProductState = {
    _id: string,
    title: string,
    color: string,
    price: string,
    qty: number
};

const products: ProductState[] = [
    { _id: '1', title: 'Apple', color: 'bg-red-400', price: '15.50', qty: 1 },
    { _id: '2', title: 'Kiwi', color: 'bg-green-500', price: '7.50', qty: 1 },
    { _id: '3', title: 'Lemon', color: 'bg-yellow-500', price: '22.30', qty: 1 },
    { _id: '4', title: 'Strawberry', color: 'bg-red-600', price: '27', qty: 1 },
    { _id: '5', title: 'Blueberry', color: 'bg-purple-500', price: '18.55', qty: 1 },
    { _id: '6', title: 'Orange', color: 'bg-orange-500', price: '22.30', qty: 1 }
];

export default function Button() {
    const [sidebar, setSidebar] = useState<boolean>(false);

    const onToggle = (bool: boolean) => {
        setSidebar(bool);
    }

    const [cart, setCart] = useState<ProductState[]>(() => {
        if (HAS_WINDOW) {
            const hasData = LocalStorageHandler.get(CART_STORAGE_KEY);
            return hasData !== null ? hasData : [];
        }

        return [];
    });

    useEffect(() => {
        if (HAS_WINDOW) {
            LocalStorageHandler.set(CART_STORAGE_KEY, cart);
        }
    }, [cart]);

    const [showCart, setShowCart] = useState(() => {
        if (HAS_WINDOW) {
            const hasShow = LocalStorageHandler.get(CART_INDICATOR_STORAGE_KEY);
            return hasShow !== null || hasShow !== false ? hasShow : false;
        }

        return false;
    });

    const handleToggleShowCart = (bool: boolean) => {
        setShowCart(bool);
    }

    useEffect(() => {
        if (HAS_WINDOW) {
            LocalStorageHandler.set(CART_INDICATOR_STORAGE_KEY, showCart);
        }
    }, [showCart]);


    const [lastCartItem, setLastCartItem] = useState<ProductState>(() => {
        if (HAS_WINDOW) {
            const hasData = LocalStorageHandler.get(CART_LAST_ITEM_KEY);
            return hasData !== null ? hasData : null;
        }

        return null;
    });

    useEffect(() => {
        if (HAS_WINDOW) {
            LocalStorageHandler.set(CART_LAST_ITEM_KEY, lastCartItem);
        }
    }, [lastCartItem]);


    useEffect(() => {
        if (cart && cart.length < 1) {
            handleToggleShowCart(false);

            if (sidebar) {
                onToggle(false);
            }
        }
    }, [cart, sidebar, handleToggleShowCart, onToggle]);

    const handleAddToCart = (product: ProductState) => {
        handleToggleShowCart(true);

        setCart((prev) => {
            const findIndex = prev.findIndex((item) => item._id === product._id);

            if (findIndex !== -1) {
                return prev.map((item) => {
                    if (item._id === product._id) {
                        return { ...item, qty: item.qty + 1 }
                    }
                    return item;
                });
            }

            return [...prev, { ...product }];
        });


        setLastCartItem(product);
    };

    const handleActions = (type: string, id?: string | undefined) => {
        switch (type) {
            case 'clear':
                setCart([]);
                onToggle(false);
                break;
            case 'del':
                setCart((prev) => {
                    return prev.filter((item) => item._id !== id);
                });
                break;
            case 'dec':
                setCart((prev) => {
                    return prev.map((item) => {
                        if (item._id === id) {
                            if (item.qty <= 1) {
                                return { ...item }
                            }

                            return { ...item, qty: item.qty - 1 }
                        }

                        return { ...item }
                    });
                });
                break;
            case 'inc':
                setCart((prev) => {
                    return prev.map((item) => {
                        if (item._id === id) {
                            return { ...item, qty: item.qty + 1 }
                        }

                        return { ...item }
                    });
                });
                break;
            default:
                break;
        }
    }

    const productPrice = useCallback((price: string) => {
        return CurrencyFormat.get({ value: +price });
    }, []);

    const renderProducts = useCallback(() => {
        return products.map((product) => {
            const color = product.color;
            return (
                <div className={cn('border-[1px]')} key={product._id}>
                    <div className={cn('w-full h-40 p-4', color)} />

                    <div className={cn('px-4 py-6')}>
                        <h3 className='text-2xl text-zinc-600'>{product.title}</h3>
                        <small className='text-zinc-500'>{productPrice(product.price)}</small>
                    </div>

                    <div className={cn('p-4 border-t-[1px]')}>
                        <button onClick={() => handleAddToCart(product)} className='py-2 px-4 bg-blue-500 text-white shadow-lg outline-none rounded-3xl' type='button'>Add to cart</button>
                    </div>
                </div>
            )
        })
    }, [products]);

    return (
        <>
            <div className='flex justify-between gap-2 mb-8 pb-4 '>
                <h2 className='text-3xl'>Products <small>({products.length})</small></h2>
                <ToggleCart data={cart} onToggle={onToggle} />
            </div>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mb-4'>
                {renderProducts()}
            </div>

            <Sidebar open={sidebar} onClose={onToggle} data={cart} handleActions={handleActions} />

            <NonSSR children={<CartIndicator open={showCart} onClose={handleToggleShowCart} item={lastCartItem} />} />
        </>
    )
}

type ToggleCartState = {
    data: ProductState[],
    onToggle: (bool: boolean) => void
}

function ToggleCart({ data, onToggle }: ToggleCartState) {
    const hasPulse = useMemo(() => {
        let className = data && data.length > 0 ? 'animate-pulse' : '';
        return className;
    }, [data]);

    const isDisabled = useMemo(() => {
        const isDisabled = data && data.length < 1 ? true : false;
        return !isDisabled;
    }, [data]);

    return (
        <button onClick={() => onToggle(true)} type='button' className={cn('flex gap-1 relative items-center bg-blue-500 px-4 rounded-3xl shadow-lg text-xl text-white disabled:cursor-not-allowed disabled:opacity-50')}>
            <TotalAmount cart={data} />
            <span>Cart</span>
            <NonSSR>
                {hasPulse ? (
                    <span className={cn('absolute -top-2 -right-2 w-4 h-4 z-1 rounded-full bg-purple-500 shadow-xl border border-white', hasPulse)} />
                ) : null}
            </NonSSR>
        </button>
    )
}

type TotalAmountState = {
    cart: ProductState[]
}

function TotalAmount({ cart }: TotalAmountState) {
    const totalAmount = useMemo(() => {
        const value = cart.reduce((acc, item) => acc + item.qty, 0);
        return value;
    }, [cart]);

    return (
        <NonSSR>
            <span className='inline-flex justify-center h-8 pr-2 items-center text-white rounded-full'>
                {totalAmount}
            </span>
        </NonSSR>
    )
}

type SidebarState = {
    open: boolean,
    onClose: (bool: boolean) => void,
    data: ProductState[],
    handleActions: (type: string, id?: string | undefined) => void,
}

function Sidebar({ open, onClose, data, handleActions }: SidebarState) {
    const isOpen = open ? 'translate-x-0' : 'translate-x-full';
    const isBackdrop = open ? 'opacity-100 visible' : 'opacity-0 invisible';
    const reverseData = [...data].toReversed();

    return (
        <>
            <aside className={cn('flex overflow-y-auto flex-col gap-4 items-start fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white px-4 py-8 z-50 transition-all duration-300', isOpen)}>
                <header className='w-full h-12 border-b-[1px]'>
                    <button onClick={() => onClose(false)} type='button'>Close</button>
                </header>
                <Cart data={reverseData} handleActions={handleActions} />
            </aside >

            <div onClick={() => onClose(false)} className={cn('fixed inset-0 z-40 bg-zinc-900/50 transition-all duration-300', isBackdrop)} />
        </>
    )
}

type CartState = {
    data: ProductState[],
    handleActions: (type: string, id?: string | undefined) => void,
}

function Cart({ data, handleActions }: CartState) {
    const productPrice = useCallback((qty: number, price: string) => {
        const value = qty * +price;
        return CurrencyFormat.get({ value: value });
    }, []);

    const renderTotal = useMemo(() => {
        const value = data.reduce((acc, item) => acc + (parseFloat(item.price) * item.qty), 0);
        return CurrencyFormat.get({ value: value });
    }, [data])

    const renderCart = useCallback(() => {
        if (data && data.length < 1) {
            return <p className='text-center w-full text-zinc-600 p-6'>Your cart is empty!</p>
        }

        return data.map((product) => {
            const color = product.color;

            return (
                <div className='flex justify-between items-center w-full p-4 gap-4 odd:bg-zinc-100 even:bg-white' key={product._id}>
                    <div className='flex items-center gap-4'>
                        <div className={cn('w-12 h-12 rounded-md', color)} />

                        <div>
                            <h3 className='text-xl text-zinc-600'>{product.title}</h3>
                            <small>{productPrice(product.qty, product.price)}</small>
                        </div>

                        <div className='flex items-center gap-2 border-[1px] rounded-3xl px-2 bg-white'>
                            <button onClick={() => handleActions('dec', product._id)} className='text-3xl text-zinc-400' type='button'>-</button>
                            <span className={cn('min-w-5 text-center justify-center px-2 inline-flex border-x-[1px] border-zinc-200')}>{product.qty}</span>
                            <button onClick={() => handleActions('inc', product._id)} className='text-3xl text-zinc-400' type='button'>+</button>
                        </div>
                    </div>

                    <button onClick={() => handleActions('del', product._id)} className='text-red-500 font-medium' type='button'>Remove</button>
                </div>
            )
        })
    }, [data]);

    const hasCart = useMemo(() => {
        return data && data.length > 0;
    }, [data]);

    return (
        <NonSSR>
            {hasCart ? (
                <div className='flex w-full justify-end border-b-[1px] pb-4'>
                    <button onClick={() => handleActions('clear')} type='button'>Clear all</button>
                </div>
            ) : null}

            {renderCart()}

            {hasCart ? (
                <div className='flex w-full items-center gap-2 justify-between border-t-[1px] pt-4'>
                    <h4 className='text-2xl'>Total:</h4>
                    <span>{renderTotal}</span>
                </div>
            ) : null}
        </NonSSR>
    );
}

type CartIndicatorState = {
    open: boolean,
    onClose: (bool: boolean) => void,
    item: ProductState
}

function CartIndicator({ open, onClose, item }: CartIndicatorState) {
    const hasShow = open ? 'translate-y-0' : 'translate-y-full';

    const productPrice = useCallback(() => {
        const value = +item.price;
        return CurrencyFormat.get({ value: value });
    }, [item]);

    const renderProduct = useCallback(() => {
        if (!item) return null;

        const color = item.color;

        return (
            <div className='flex gap-4'>
                <div className={cn('w-12 h-12 bg-zinc-400 rounded-md', color)} />
                <div>
                    <h3>{item.title}</h3>
                    <p>{productPrice()}</p>
                </div>
            </div>
        )
    }, [item]);

    return (
        <div className={cn('fixed w-full left-0 bottom-0 right-0 h-16 bg-white/75 transition-all duration-300 backdrop-blur-md border-t-[1px] z-30', hasShow)}>
            <Container className='flex justify-between items-center h-full'>
                {renderProduct()}
                <button className='text-blue-500 font-medium' onClick={() => onClose(false)} type='button'>Close</button>
            </Container>
        </div>
    )
}