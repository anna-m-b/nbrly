const { db } = require('../configFirebase')
const geodist = require('geodist')

export const getMatchedUsers = async (activity) => {
  const usersRef = db.collection('users')
  const matchedUsersDocs = await usersRef
    .where('interests', 'array-contains', activity)
    .get()
  let matchedUsers = []
  matchedUsersDocs.forEach((doc) => {
    matchedUsers.push({ ...doc.data(), uid: doc.id })
  })
  return matchedUsers
}

export const calculateDistance = (currentUser, userList) => {
  return userList.map((user) => {
    const distance = geodist(
      currentUser,
      { latitude: user.latitude, longitude: user.longitude },
      { unit: 'mi', exact: true }
    )
    return { ...user, distance: Math.ceil(distance) }
  })
}

export const sortByDistance = (distanceUserList) => {
  return distanceUserList.sort((userA, userB) =>
    userA.distance >= userB.distance ? 1 : -1
  )
}
