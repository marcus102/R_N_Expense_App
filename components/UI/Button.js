import { StyleSheet, View, Pressable, Text } from "react-native";
import { GlobalStyles } from "../../constants/Styles";


function Button({children, onButtonPress, mode, style}) {
  return(
    <View style={style}>
      <Pressable onPress={onButtonPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;


const styles = StyleSheet.create({
  button:{
    borderRadius: 8,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat:{
    backgroundColor: 'transparent',
    borderRadius: 4,
  },
  buttonText:{
    color: 'white',
    textAlign: 'center',
  },
  flatText:{
    color: GlobalStyles.colors.primary200,
  },
  pressed:{
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
  },

});