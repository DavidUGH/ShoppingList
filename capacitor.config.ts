import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.shoppinglist.app',
	appName: 'shoppinglist',
	webDir: 'build',
	plugins: {
		CapacitorSQLite: {
			iosDatabaseLocation: 'Library/CapacitorDatabase',
			iosIsEncryption: true,
			iosKeychainPrefix: 'angular-sqlite-app-starter',
			iosBiometric: {
				biometricAuth: false,
				biometricTitle : "Biometric login for capacitor sqlite"
			},
			androidIsEncryption: true,
			androidBiometric: {
				biometricAuth : false,
				biometricTitle : "Biometric login for capacitor sqlite",
				biometricSubTitle : "Log in using your biometric"
			},
			electronIsEncryption: true,
			electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
			electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
			electronLinuxLocation: "Databases"
		}
	}
};

export default config;
