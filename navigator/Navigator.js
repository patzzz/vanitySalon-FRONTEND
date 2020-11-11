import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createDrawerNavigator } from "react-navigation-drawer";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/user/SignUpScreen";
import SignUpScreen2 from "../screens/user/SignUpScreen2";
import NewAppointmentScreen from "../screens/user/NewAppointmentScreen";
import CancelAppointmentScreen from "../screens/user/CancelAppointmentScreen";
import AppointmentDetailsScreen from "../screens/admin/AppointmentDetailsScreen";
import TodaysAppointmentsScreen from "../screens/admin/TodaysAppointmentsScreen";
import PendingAppointmentsScreen from "../screens/admin/PendingAppointmentsScreen";
import ConfirmedAppointmentsScreen from "../screens/admin/ConfirmedAppointmentsScreen";
import UserListScreen from "../screens/admin/UserListScreen";
import ClientDetailsScreen from "../screens/admin/ClientDetailsScreen";
import BlacklistScreen from "../screens/admin/BlacklistScreen";
import AllAppointmentsScreen from "../screens/user/AllAppointmentsScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import UserAppointmentDetailsScreen from "../screens/user/UserAppointmentDetailsScreen";
import SendMessageScreen from "../screens/admin/SendMessageScreen";
import DashboardUserScreen from "../screens/user/DashboardUserScreen";
import DashboardAdminScreen from "../screens/admin/DashboardAdminScreen";
import CancelledAppointmentsScreen from "../screens/admin/CancelledAppointmentsScreen";
import AppointmentDetailsUserScreen from "../screens/user/AppointmentDetailsUserScreen";
import AccomplishedAppointmentsScreen from "../screens/admin/AccomplishedAppointmentsScreen";
import SignUpScreen3 from "../screens/user/SignUpScreen3";
import DaysOff from "../screens/admin/DaysOffScreen";
import TermsAndConditions from "../screens/TermsAndConditions";
import AppointmentButtonsScreen from "../screens/admin/AppointmentButtonsScreen";
import FirstScreen from "../screens/FirstScreen";

const AppStack = createStackNavigator({
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
  SignUp2: SignUpScreen2,
  NewAppointment: NewAppointmentScreen,
  CancelAppointment: CancelAppointmentScreen,
  AppointmentDetails: AppointmentDetailsScreen,
  TodaysAppointments: TodaysAppointmentsScreen,
  PendingAppointments: PendingAppointmentsScreen,
  ConfirmedAppointments: ConfirmedAppointmentsScreen,
  UserList: UserListScreen,
  ClientDetails: ClientDetailsScreen,
  Blacklist: BlacklistScreen,
  AllAppointments: AllAppointmentsScreen,
  UserProfile: UserProfileScreen,
  UserAppointmentDetails: UserAppointmentDetailsScreen,
  SendMessage: SendMessageScreen,
  DashboardUser: DashboardUserScreen,
  DashboardrAdmin: DashboardAdminScreen,
  CancelledAppointments: CancelledAppointmentsScreen,
  AppointmentDetailsUser: AppointmentDetailsUserScreen,
  AccomplishedAppointments: AccomplishedAppointmentsScreen,
  FirstScreen: FirstScreen,
});

const AuthStack = createStackNavigator({
  FirstScreen: {
    screen: FirstScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LogIn: {
    screen: LogInScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp2: {
    screen: SignUpScreen2,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp3: {
    screen: SignUpScreen3,
    navigationOptions: {
      headerShown: false,
    },
  },
  NewAppointment: {
    screen: NewAppointmentScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CancelAppointment: {
    screen: CancelAppointmentScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AppointmentDetails: {
    screen: AppointmentDetailsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TodaysAppointments: {
    screen: TodaysAppointmentsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PendingAppointments: {
    screen: PendingAppointmentsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ConfirmedAppointments: {
    screen: ConfirmedAppointmentsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CancelledAppointments: {
    screen: CancelledAppointmentsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserList: {
    screen: UserListScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ClientDetails: {
    screen: ClientDetailsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Blacklist: {
    screen: BlacklistScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AllAppointments: {
    screen: AllAppointmentsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserProfile: {
    screen: UserProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserAppointmentDetails: {
    screen: UserAppointmentDetailsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SendMessage: {
    screen: SendMessageScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DashboardUser: {
    screen: DashboardUserScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DashboardAdmin: {
    screen: DashboardAdminScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AppointmentButtons: {
    screen: AppointmentButtonsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AppointmentDetailsUser: {
    screen: AppointmentDetailsUserScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AccomplishedAppointments: {
    screen: AccomplishedAppointmentsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DaysOff: {
    screen: DaysOff,
    navigationOptions: {
      headerShown: false,
    },
  },
  TermsAndConditions: {
    screen: TermsAndConditions,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default Navigator = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Auth",
    }
  )
);
