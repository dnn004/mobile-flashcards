
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {

              Notifications.cancelAllScheduledNotificationsAsync()

              let trigger = new Date()
              trigger.setDate(trigger.getDate() + 1)
              trigger.setHours(20)
              trigger.setMinutes(0)

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Study!',
                  body: "👋 don't forget to quiz yourself today!"
                },
                trigger: {
                  repeats: true,
                  seconds: (trigger - Date.now()) * 1000,
                }
              })
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
