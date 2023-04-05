import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import IconButtom from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import{ storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
  const [error, setError] = useState();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const expenseContext = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const selectedExpense = expenseContext.expenses.find((expense) => expense.id === editedExpenseId);
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try{
      await deleteExpense(editedExpenseId);
      expenseContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmiting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        expenseContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
  
      } else {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    }  catch (error) {
      setError('Could not save data - please try again later!')
      setIsSubmiting(false);
    }
  
  }

  if (error && !isSubmiting) {
    return(
      <ErrorOverlay message={error}/>
    );
  }

  if(isSubmiting) {
    return(
      <LoadingOverlay />
    );
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        sumitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButtom
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onButtonPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
