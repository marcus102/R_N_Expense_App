
import { StyleSheet, View, Text, TextInput} from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Input({label, invalid, textInputConfig, style}) {

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return(
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel ]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer:{
    marginHorizontal:4,
    marginVertical: 10,
  },
  label:{
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  }, 
  input:{
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius:6,
    fontSize: 15,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline:{
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel:{
    color: GlobalStyles.colors.error500,
  },
  invalidInput:{
    backgroundColor: GlobalStyles.colors.error50,
  },
});