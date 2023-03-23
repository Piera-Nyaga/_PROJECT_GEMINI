import { createAction, props } from "@ngrx/store";
import { AdminUser, LoginSuccess, LoginUser, Message, User } from "../../Interfaces/user";



export const login = createAction('[login]-login-user', props<{ user: LoginUser }>())
export const loginSuccess = createAction('[login]-login-Success', props<{ res: LoginSuccess }>())
export const loginFailure = createAction('[login]-login-Failure', props<{ errorMessage: string }>())

export const register = createAction('[register]-register-user', props<{ user: User }>())
export const registerSuccess = createAction('[register]-register-Success', props<{ res: Message }>())
export const registerFailure = createAction('[register]-register-Failure', props<{ errorMessage: string }>())

export const getUsers = createAction('[allUsers]-getUsers')
export const getUsersSuccess = createAction('[allUsers]-getUsersSuccess', props<{ users: AdminUser[]}>())
export const getUsersFailure = createAction('[allUsers]-getUsersFailure', props<{ errorMessage: string }>())

export const deleteUser = createAction('[deleteUser]-deleteUser', props<{ id: string }>())
export const deleteUserSuccess = createAction('[deleteUser]-deleteUserSuccess', props<{ message: Message }>())
export const deleteUserFailure = createAction('[deleteUser]-deleteUserFailure', props<{ errorMessage: string }>())
