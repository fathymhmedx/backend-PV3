const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        patientId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        medicalHistory: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // doctorId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     references: {
        //         model: 'doctors',
        //         key: 'doctorId' // تغيير من 'id' إلى 'doctorId' لتتوافق مع النموذج
        //     },
        //     onUpdate: 'CASCADE',
        //     onDelete: 'SET NULL'
        // }
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'patients'
    });

    
    // تشفير كلمة المرور قبل الحفظ
    Patient.beforeCreate(async (patient) => {
        if (patient.password) {
            const salt = await bcrypt.genSalt(10);
            patient.password = await bcrypt.hash(patient.password, salt);
        }
    });

    return Patient; // تصدير النموذج مرة واحدة فقط
};