import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import RNFetchBlob from "rn-fetch-blob";

const Home = () => {
  const [pastedURL, setpastedURL] = useState("");

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Downloader App storage Permission",
          message:
            "Downloader App needs access to your storage " +
            "so you can take download files.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          fileDir +
          "/download" +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          "mp4",
        description: "file download",
      },
    })
      .fetch("GET", "pastedURL", {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log("The file saved to ", res.path());
        alert('file downloaded successfully');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="enter url"
        style={styles.input1}
        value={pastedURL}
        onChangeText={(txt) => setpastedURL(txt)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (pastedURL !== "") {
            requestStoragePermission();
          } else {
            alert("Please Add URL");
          }
        }}
      >
        <Text style={{ color: "#fff" }}> Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input1: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    alignSelf: "center",
    paddingLeft: 20,
    borderRadius: 20,
  },
  button: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    alignSelf: "center",
    backgroundColor: "black",
    paddingLeft: 20,
    borderRadius: 20,
  },
});
