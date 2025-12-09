declare namespace I18n {
  type Page = {
    about: {
      devDep: string;
      introduction: string;
      prdDep: string;
      projectInfo: {
        githubLink: string;
        latestBuildTime: string;
        previewLink: string;
        title: string;
        version: string;
      };
      title: string;
    };
    function: {
      multiTab: {
        backTab: string;
        routeParam: string;
      };
      request: {
        repeatedError: string;
        repeatedErrorMsg1: string;
        repeatedErrorMsg2: string;
        repeatedErrorOccurOnce: string;
      };
      tab: {
        tabOperate: {
          addMultiTab: string;
          addMultiTabDesc1: string;
          addMultiTabDesc2: string;
          addTab: string;
          addTabDesc: string;
          closeAboutTab: string;
          closeCurrentTab: string;
          closeTab: string;
          title: string;
        };
        tabTitle: {
          change: string;
          changeTitle: string;
          reset: string;
          resetTitle: string;
          title: string;
        };
      };
      toggleAuth: {
        adminOrUserVisible: string;
        adminVisible: string;
        authHook: string;
        superAdminVisible: string;
        toggleAccount: string;
      };
    };
    home: {
      creativity: string;
      dealCount: string;
      downloadCount: string;
      entertainment: string;
      greeting: string;
      message: string;
      projectCount: string;
      projectNews: {
        desc1: string;
        desc2: string;
        desc3: string;
        desc4: string;
        desc5: string;
        moreNews: string;
        title: string;
      };
      registerCount: string;
      rest: string;
      schedule: string;
      study: string;
      todo: string;
      turnover: string;
      visitCount: string;
      weatherDesc: string;
      work: string;
    };
    login: {
      bindWeChat: {
        title: string;
      };
      codeLogin: {
        getCode: string;
        imageCodePlaceholder: string;
        reGetCode: string;
        sendCodeSuccess: string;
        title: string;
      };
      common: {
        back: string;
        codeLogin: string;
        codePlaceholder: string;
        confirm: string;
        confirmPasswordPlaceholder: string;
        loginOrRegister: string;
        loginSuccess: string;
        passwordPlaceholder: string;
        phonePlaceholder: string;
        userNamePlaceholder: string;
        validateSuccess: string;
        welcomeBack: string;
      };
      pwdLogin: {
        admin: string;
        forgetPassword: string;
        otherAccountLogin: string;
        otherLoginMode: string;
        register: string;
        rememberMe: string;
        superAdmin: string;
        title: string;
        user: string;
      };
      register: {
        agreement: string;
        policy: string;
        protocol: string;
        title: string;
      };
      resetPwd: {
        title: string;
      };
    };
    manage: {
      common: {
        status: {
          disable: string;
          enable: string;
        };
      };
      menu: {
        activeMenu: string;
        addChildMenu: string;
        addMenu: string;
        button: string;
        buttonCode: string;
        buttonDesc: string;
        constant: string;
        editMenu: string;
        fixedIndexInTab: string;
        form: {
          activeMenu: string;
          button: string;
          buttonCode: string;
          buttonDesc: string;
          fixedIndexInTab: string;
          fixedInTab: string;
          hideInMenu: string;
          home: string;
          href: string;
          i18nKey: string;
          icon: string;
          keepAlive: string;
          layout: string;
          localIcon: string;
          menuName: string;
          menuStatus: string;
          menuType: string;
          multiTab: string;
          order: string;
          page: string;
          parent: string;
          pathParam: string;
          queryKey: string;
          queryValue: string;
          routeName: string;
          routePath: string;
        };
        hideInMenu: string;
        home: string;
        href: string;
        i18nKey: string;
        icon: string;
        iconType: {
          iconify: string;
          local: string;
        };
        iconTypeTitle: string;
        id: string;
        keepAlive: string;
        layout: string;
        localIcon: string;
        menuName: string;
        menuStatus: string;
        menuType: string;
        multiTab: string;
        order: string;
        page: string;
        parent: string;
        parentId: string;
        pathParam: string;
        query: string;
        routeName: string;
        routePath: string;
        title: string;
        type: {
          directory: string;
          menu: string;
        };
      };
      role: {
        addRole: string;
        buttonAuth: string;
        editRole: string;
        form: {
          roleCode: string;
          roleDesc: string;
          roleName: string;
          roleStatus: string;
        };
        menuAuth: string;
        roleCode: string;
        roleDesc: string;
        roleName: string;
        roleStatus: string;
        title: string;
      };
      roleDetail: {
        content: string;
        explain: string;
      };
      user: {
        addUser: string;
        editUser: string;
        form: {
          nickName: string;
          userEmail: string;
          userGender: string;
          userName: string;
          userPhone: string;
          userRole: string;
          userStatus: string;
        };
        gender: {
          female: string;
          male: string;
        };
        nickName: string;
        title: string;
        userEmail: string;
        userGender: string;
        userName: string;
        userPhone: string;
        userRole: string;
        userStatus: string;
      };
      userDetail: {
        content: string;
        explain: string;
      };
    };
  };
}
