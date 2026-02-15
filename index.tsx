import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from "react-native";
import AsyncStorage from'@react-native-async-storage/async-storage'
import { useState, useEffect } from "react";
export default function Home(){
    const [text, setText] = useState("")
    const [fruit, setFruit] =useState("")


    useEffect(() => {
        loadFruit()
    }, [])

    async function saveFruit(){
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    async function loadFruit() {
        const data = await AsyncStorage.getItem("fruit")
        if (data != ""){
            setFruit(data!.toString())
        }
    }

    async function removeFruit() {
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }
 return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bee09</Text>

        <Text style={styles.label}>
          Fruit : <Text style={styles.value}>{fruit || "-"}</Text>
        </Text>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter fruit name"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={saveFruit}>
          <Text style={styles.btnText}>บันทึก</Text>
        </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={removeFruit}>
          <Text style={styles.btnText}>ลบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  value: {
    fontWeight: "bold",
    color: "#2E86DE",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#2ECC71",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteBtn: {
    backgroundColor: "#E74C3C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
