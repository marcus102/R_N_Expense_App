import { useContext } from "react";
import { StyleSheet } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpencesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {

  const expensesContext = useContext(ExpensesContext);

  return(
    <ExpensesOutput fallbackText='No registered expenses found!' expenses={expensesContext.expenses} expensesPeriod= 'Total' />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({

});