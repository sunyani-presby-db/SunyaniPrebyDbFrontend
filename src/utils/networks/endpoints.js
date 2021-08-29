const baseUrl = "http://100.25.217.86"
// export const postUrl = "sdasdasdasdasd"
export const loginUrl = `${baseUrl}/account/login`
export const membersUrl = `${baseUrl}/members`
export const memberDetailedUrl =id => `${baseUrl}/members/detailed/${id}`
export const addMemberUrl = `${baseUrl}/members/add`
export const getUsersUrl = `${baseUrl}/account`
export const userDetailedUrl =id=> `${getUsersUrl}/${id}`
export const addUserUrl = `${getUsersUrl}/add`
export const attendanceUrl = `${baseUrl}/attendance`
export const getGroupsUrl = `${baseUrl}/members/groups`