// next-pwa-navy.vercel.app
/** @type {import('next').NextConfig} */

const production = process.env.NODE_ENV === 'production';
const disable = production ? false : true;

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: disable, 
});

const nextConfig = {};

module.exports = withPWA(nextConfig);

