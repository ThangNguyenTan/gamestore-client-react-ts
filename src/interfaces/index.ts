export * from './user'
export * from './genre'
export * from './feature'
export * from './game'
export * from './developer'
export * from './publisher'
export * from './order'
export * from './wishlist'

declare global {
    interface Window {
        paypal: boolean
    }
}
