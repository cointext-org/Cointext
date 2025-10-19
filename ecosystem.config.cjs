module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'fetch-prices',
      script: 'scripts/fetchPrices.js',
      instances: 1,
      autorestart: false,
      cron_restart: '0 * * * *', // 每小时执行一次 (每小时的第0分钟)
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'fetch-staking-apy',
      script: 'scripts/fetchStakingApy.js',
      instances: 1,
      autorestart: false,
      cron_restart: '0 */6 * * *', // 每6小时执行一次
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'fetch-trending-pools',
      script: 'scripts/fetchTrendingPools.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'virtual-agents-scraper',
      script: 'scripts/runVirtualScraper.cjs',
      instances: 1,
      autorestart: false,
      cron_restart: '*/10 * * * *', // 每10分钟执行一次
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    }
  ],
};
