import {
  MdAccountBalance, MdOutlineManageAccounts, MdAttachMoney, MdOutlineSwapHoriz,
  MdSettings, MdPerson, MdAdd, MdEdit, MdGroup, MdCreate, MdViewList,
  MdCheckCircle, MdPending, MdError, MdDownload, MdFilterList, MdSummarize,
  MdPassword, MdSupervisorAccount,
} from "react-icons/md";

import {
  Key, Users, UserCog, UserPlus
} from 'lucide-react';

export const SidebarData = {
  Accounts: {
    icon: <MdAccountBalance />,
    subMenu: {
      "View Account": {
        icon: <MdOutlineManageAccounts />,
        subMenu: {
          "Account Details": { icon: <MdPerson />, path: "/accounts/view/details" },
          "Service Request": { icon: <MdGroup />, path: "/accounts/view/service-request" },
          "Employees": { icon: <MdGroup />, path: "/accounts/view/employees" },
        },
      },
      "Add Account": {
        icon: <MdAdd />,
        subMenu: {
          "Change Account": { icon: <MdOutlineManageAccounts />, path: "/accounts/add/change" },
          "Edit Account": { icon: <MdEdit />, path: "/accounts/add/edit" },
          "Edit Employee Accounts": { icon: <MdEdit />, path: "/accounts/add/edit-employees" },
        },
      },
    },
  },
  Cash: {
    icon: <MdAttachMoney />,
    subMenu: {
      Create: {
        icon: <MdCreate />,
        subMenu: {
          Payroll: { icon: <MdCreate />, path: "/cash/create/payroll" },
          "Rolled Payees": { icon: <MdGroup />, path: "/cash/create/rolled-payees" },
          Drafts: { icon: <MdCreate />, path: "/cash/create/drafts" },
          "Quick Currency Calculator": { icon: <MdCreate />, path: "/cash/create/calculator" },
        },
      },
      Manage: {
        icon: <MdViewList />,
        subMenu: {
          "Make Approvers": { icon: <MdGroup />, path: "/cash/manage/approvers" },
          "View Rolled Payees": { icon: <MdGroup />, path: "/cash/manage/rolled-payees" },
        },
      },
      Approver: {
        icon: <MdCheckCircle />,
        subMenu: {
          "Approved Payees": { icon: <MdCheckCircle />, path: "/cash/approver/approved" },
          "Pending Payees": { icon: <MdPending />, path: "/cash/approver/pending" },
        },
      },
    },
  },
  Transactions: {
    icon: <MdOutlineSwapHoriz />,
    subMenu: {
      "Payees Rolled": {
        icon: <MdGroup />,
        subMenu: {
          "Failed Transactions": { icon: <MdError />, path: "/transactions/rolled/failed" },
          "Successful Transactions": { icon: <MdCheckCircle />, path: "/transactions/rolled/successful" },
          "Hold Transactions": { icon: <MdPending />, path: "/transactions/rolled/hold" },
        },
      },
      "E-Statements": {
        icon: <MdDownload />,
        subMenu: {
          "Filter Transactions": { icon: <MdFilterList />, path: "/transactions/statements/filter" },
          "Download Transactions": { icon: <MdDownload />, path: "/transactions/statements/download" },
          "Transactions Summary": { icon: <MdSummarize />, path: "/transactions/statements/summary" },
        },
      },
    },
  },
  Settings: {
    icon: <MdSettings />,
    subMenu: {
      "Change Password": { icon: <Key />, path: "/settings/change-password" },
      "View Approvers": { icon: <Users />, path: "/settings/view-approvers" },
      "View Managers": { icon: <UserCog />, path: "/settings/view-managers" },
      "View Creators": { icon: <UserPlus />, path: "/settings/view-creators" },
    },
  },
};