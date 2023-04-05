import { StyleSheet, View, Pressable} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButtom({icon, size, color, onButtonPress}) {
  return(
    <Pressable onPress={onButtonPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButtom;

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed:{
    opacity: 0.77,
  },
});