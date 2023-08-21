const Sequelize = require("sequelize");

class RoomUser extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        selfGranted: {
          type: Sequelize.DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          comment:
            "채팅방 나갔는지 판단 (null or 0: 둘 다 접근 가능, 유저id: 해당 유저만 접근 가능 )",
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "room_user",
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    );
  }
  static associate(db) {}
}

module.exports = RoomUser;
