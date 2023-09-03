const db = require("../models");
module.exports = async () => {
  const force = true;
  await db.sequelize
    .sync({ force: force })
    .then(async () => {
      if (force) {
        await db.User.create({
          role: 0,
          user_name: "admin",
          email: "t@t.com",
          phone_number: "12312341234",
          password: "1234",
        });
        await db.User.create({
          role: 0,
          user_name: "adminA",
          email: "a@a.com",
          phone_number: "23423452345",
          password: "1234",
        });
        await db.User.create({
          role: 0,
          user_name: "adminB",
          email: "b@b.com",
          phone_number: "34534563456",
          password: "1234",
        });
        await db.User.create({
          role: 0,
          user_name: "adminC",
          email: "c@c.com",
          phone_number: "45645674567",
          password: "1234",
        });
        await db.User.create({
          role: 0,
          user_name: "adminD",
          email: "d@d.com",
          phone_number: "56756785678",
          password: "1234",
        });
        await db.ChatRoom.create({
          room_name: "1_2",
        });
        await db.ChatRoom.create({
          room_name: "1_3",
        });
        await db.ChatParticipant.create({
          user_id: 1, // 외래 키
          room_id: 1, // 외래 키
          role: "SELLER",
          self_granted: 0,
        });
        await db.ChatParticipant.create({
          user_id: 2, // 외래 키
          room_id: 1, // 외래 키
          role: "BUYER",
          self_granted: 0,
        });
        await db.Catagory.bulkCreate([
          {
            name: "전체",
          },
          {
            name: "남성의류",
          },
          {
            name: "여성의류",
          },
          {
            name: "패션잡화",
          },
          {
            name: "스포츠 용품",
          },
          {
            name: "신발",
          },
          {
            name: "가전제품",
          },
          {
            name: "컴퓨터/주변기기",
          },
          {
            name: "전자제품",
          },
          {
            name: "가구",
          },
          {
            name: "기타",
          },
        ]);
        await db.Product.bulkCreate([
          {
            status: "SOLD",
            title: "텐트",
            price: 200000,
            category: "기타",
            detail: "텐트",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/1.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "PS5",
            price: 350000,
            category: "전자기기",
            detail: "PS5",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/2.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "금반지",
            price: 600000,
            category: "패션잡화",
            detail: "금반지",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/3.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "축구공",
            price: 45000,
            category: "스포츠 용품",
            detail: "축구공",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/4.jpg",
            seller_id: 1,
          },
          {
            status: "SOLD",
            title: "아이패드",
            price: 500000,
            category: "전자기기",
            detail: "아이패드",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/5.jpg",
            seller_id: 1,
          },
          {
            status: "RESERVED",
            title: "빔프로젝터",
            price: 200000,
            category: "전자기기",
            detail: "빔프로젝터",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/6.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "기타",
            price: 50000,
            category: "기타",
            detail: "기타",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/7.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "자전거",
            price: 800000,
            category: "스포츠 용품",
            detail: "자전거",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/8.jpg",
            seller_id: 1,
          },
          {
            status: "RESERVED",
            title: "키보드",
            price: 80000,
            category: "컴퓨터/주변기기",
            detail: "키보드",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/9.jpg",
            seller_id: 1,
          },
          {
            status: "RESERVED",
            title: "카메라",
            price: 200000,
            category: "전자기기",
            detail: "카메라",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/10.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "커피머신",
            price: 100000,
            category: "전자기기",
            detail: "커피머신",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/11.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "하드디스크",
            price: 50000,
            category: "컴퓨터/주변기기",
            detail: "하드디스크",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/12.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "그래픽카드",
            price: 200000,
            category: "컴퓨터/주변기기",
            detail: "그래픽카드",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/13.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "선글라스",
            price: 300000,
            category: "패션잡화",
            detail: "선글라스",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/14.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "헬멧",
            price: 80000,
            category: "패션잡화",
            detail: "헬멧",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/15.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "오토바이",
            price: 4000000,
            category: "기타",
            detail: "오토바이",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/16.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "비니",
            price: 30000,
            category: "남성의류",
            detail: "비니",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/17.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "피아노",
            price: 150000,
            category: "전자기기",
            detail: "피아노",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/18.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "컴퓨터",
            price: 400000,
            category: "컴퓨터/주변기기",
            detail: "컴퓨터",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/19.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "에어팟",
            price: 250000,
            category: "전자기기",
            detail: "에어팟",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/20.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "애플워치",
            price: 250000,
            category: "전자기기",
            detail: "애플워치",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/21.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "온도계",
            price: 50000,
            category: "전자기기",
            detail: "온도계",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/22.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "배터리",
            price: 80000,
            category: "전자기기",
            detail: "배터리",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/23.jpg",
            seller_id: 1,
          },
          {
            status: "SALE",
            title: "맥북",
            price: 1500000,
            category: "컴퓨터/주변기기",
            detail: "맥북",
            images:
              "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/24.jpg",
            seller_id: 1,
          },
          // {
          //   status: "SALE",
          //   title: "아이폰14",
          //   price: 1200000,
          //   category: "전자기기",
          //   detail: "아이폰",
          //   images:
          //     "https://product-test-01.s3.ap-northeast-2.amazonaws.com/product/1687141503355_KakaoTalk_20230612_150159629.jpg",
          //   seller_id: 1,
          // },
        ]);
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(err.code);
    });
};
