
import {
    MdAccountBalance,MdOutlineManageAccounts,MdAttachMoney,MdOutlineSwapHoriz,MdSettings,MdPerson,MdAdd,MdEdit,MdGroup,MdCreate,MdViewList,MdCheckCircle,MdPending,
    MdError,MdDownload,MdFilterList,MdSummarize, MdPassword,MdSupervisorAccount,
  } from "react-icons/md";
  import{
    Key,
    Users,
    UserCog,
    UserPlus
  } from 'lucide-react';
  
  export const SidebarData = {
    Accounts: {
      icon: <MdAccountBalance />,
      subMenu: {
        "View Account": {
          icon: <MdOutlineManageAccounts />,
          subMenu: {
            "Account Details": <MdPerson />,
            "Service Request": <MdGroup />,
            Employees: <MdGroup />,
          },
        },
        "Add Account": {
          icon: <MdAdd />,
          subMenu: {
            "Change Account":<MdOutlineManageAccounts /> ,
            "Edit Account": <MdEdit />,
            "Edit Employee Accounts": <MdEdit />,
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
            Payroll: <MdCreate />,
            "Rolled Payees": <MdGroup />,
            Drafts: <MdCreate />,
            "Quick Currency Calculator": <MdCreate />,
          },
        },
        Manage: {
          icon: <MdViewList />,
          subMenu: {
            "Make Approvers": <MdGroup />,
            "View Rolled Payees": <MdGroup />,
          },
        },
        Approver: {
          icon: <MdCheckCircle />,
          subMenu: {
            "Approved Payees": <MdCheckCircle />,
            "Pending Payees": <MdPending />,
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
            "Failed Transactions": <MdError />,
            "Successful Transactions": <MdCheckCircle />,
            "Hold Transactions": <MdPending />,
          },
        },
        "E-Statements": {
          icon: <MdDownload />,
          subMenu: {
            "Filter Transactions": <MdFilterList />,
            "Download Transactions": <MdDownload />,
            "Transactions Summary": <MdSummarize />,
          },
        },
      },
    },
    Settings: {
      icon: <MdSettings />,
      subMenu: {
        "Change Password": {icon:<Key/>},
        "View Approvers":  {icon:<Users/>},
        "View Managers":  {icon:<UserCog/>},
        "View Creators":  {icon:<UserPlus/>},
      },
    },
  };
  
  


