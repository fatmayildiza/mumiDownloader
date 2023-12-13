import { AndroidConfig } from "@expo/config-plugins";

const developmentConfig = {
  android: {
    config: {
      plugins: [
        [
          AndroidConfig.Permissions.withBlockedPermissions,
          ["android.permission.WRITE_EXTERNAL_STORAGE"],
        ],
      ],
    },
  },
};

const productionConfig = {
  android: {
    config: {
      plugins: [
        // Farklı izin ayarları ekleyebilirsiniz.
      ],
    },
  },
};

const AppConfig = {
  development: developmentConfig,
  production: productionConfig,
};

export default ({ config }) => {
  const env = process.env.NODE_ENV || "development"; // varsayılan olarak development ortamını kullanır

  return {
    ...config,
    ...AppConfig[env],
  };
};
