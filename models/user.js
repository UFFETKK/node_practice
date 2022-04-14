// //mysql의 테이블은 시퀄라이즈의 모델과 대응
// //시퀄라이저는 기본적으로 모델은 단수형 테이블이름은 복수형

// const Sequelize = require("sequelize");

// module.exports = class User extends Sequelize.Model {
//   static init(sequelize) {
//     //init으로 테이블 설정
//     return super.init(
//       //첫번째 인수는 테이블 컬럼 설정, 두번째는 테이블 자체설명
//       {
//         //id를 기본키로 연결함으로 id칼럼은 적어줄 필요가 없다.
//         //나머지는 mysql칼럼과 동일하게 작성
//         //단 VARCHAR => STRING, INT => INTEGER, TINYINT => BOOLEAN, DATETIME=> DATE
//         name: {
//           type: Sequelize.STRING(20),
//           allowNull: false,
//           unique: true,
//         },
//         age: {
//           type: Sequelize.INTEGER.UNSIGNED,
//           allowNull: false,
//         },
//         married: {
//           type: Sequelize.BOOLEAN,
//           allowNull: false,
//         },
//         comment: {
//           type: Sequelize.TEXT,
//           allowNull: true,
//         },
//         created_at: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.NOW,
//         },
//       },
//       {
//         //테이블 옵션
//         sequelize, //static init메서드의 매개변수와 연결되는 옵션, 옵션으로 db.sequelize객체를 넣어야함
//         timestamps: false, //true면 createdAt과 updateAt컬럼을 추가, 로우가 생성 수정될때 알아서 입력
//         underscored: false, //시퀄라이즈는 기본적으로 카멜케이스인데 이를 스네이크 케이스로 바꾸는 과정
//         modelName: "User", //모델 이름
//         tableName: "users",
//         paranoid: false, //true설정시 deleteAt컬럼이 생기고 로우를 삭제할떄 완전히 지워지지 않고 지운시각이 기록되고 조회시 null값 => 나중에 복원할 일이 있을까봐
//         charset: "utf8",
//         collate: "utf8_general_ci",
//       }
//     );
//   }
//   static associate(db) {
//     db.User.hasMany(db.Comment, { foreginKey: "commenter", sourceKey: "id" });
//   } //다른 모델과의 관계
// };
// //1:n 관계는 hasMany와 belongsTo지만 1:1관계에서는 hasOne과 belongsTo사용, n:m관계에서는 belongsToMany, through에 새로운모델의 이름

const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
};
