/* hoc에 컴포넌트를 넣어주어 새로운 컴포넌트를 만들어서 인증 체크를 해줌
   const EnhancedComponent = higherOrderComponent(WrappedComponent);
 -HOC------------
 |   component  |
  ---------------
-> 감싸주는 것은 App.js에서 
*/

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  // option- null, true, false
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입 불가능한 페이지
  // adminRoute => admin 유저만 들어갈 수 있도록 하려면 true (기본값은 null)

  function AuthenticationCheck(props) {
    // 백엔드에 Request를 날려서 현재 상태를 가져옴 (로그인 했는지, 아닌지)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      // Redux 사용 시

      // 아무나 진입 가능한 페이지
      // 로그인한 회원만 진입 가능한 페이지
      // 로그인한 회원은 진입 못하는 페이지
      // 관리자만 진입 가능한 페이지

      dispatch(auth()).then((response) => {
        console.log(response);
        console.log(response.payload.isAuth);
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          // 로그인 하지 않은 상태에서 로그인한 유저만 출입 가능한 페이지로 들어가려고 할 때
          if (option) {
            navigate("/");
          }
        } else {
          // 로그인 한 상태
          // 로그인 한 상태에서 admin 유저가 아니지만, admin 유저만 들어갈 수 있는 페이지에 들어가려고 할 때
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            // 로그인한 유저가 출입 불가능한 페이지에 들어가려고 할 때
            // if (option === false) navigate("/studentID");
          }
        }
      });

      // Redux를 사용하지 않을 때 -> axios.get('/api/users/auth')
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
