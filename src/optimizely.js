import optimizelySdk from '@optimizely/optimizely-sdk'
import loglevel from 'loglevel'

const optimizelyClientInstance = optimizelySdk.createInstance({
  sdkKey: process.env.SDK_KEY,
})

loglevel.setLevel('info')

optimizelyClientInstance.onReady().then(() => {
  const enabled = optimizelyClientInstance.isFeatureEnabled('tmdb_assignment_feature', 'user123')
  if (enabled) {
    loglevel.log('Feature is ON!')
  } else {
    loglevel.log('Feature is off.')
  }
})

export default optimizelyClientInstance
