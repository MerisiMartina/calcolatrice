import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  calculator: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 15,
    borderRadius: 5,
    width: '22%',
    alignItems: 'center',
  },
});

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
      const parts = input.split(/([+\-*/])/); 
      let result = parseFloat(parts[0]);

      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const nextNumber = parseFloat(parts[i + 1]);

        if (operator === '+') result += nextNumber;
        else if (operator === '-') result -= nextNumber;
        else if (operator === '*') result *= nextNumber;
        else if (operator === '/') result /= nextNumber;
      }

      setResult(result.toString());

      }
      catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    }
    else {
      setInput((prev) => prev + value);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.calculator}>
        <Text>Calcolatrice</Text>
        <TextInput style={styles.input} editable={false} placeholder="0" value={result || input} />
        
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handlePress('1')} >
            <Text style={{ color: 'black' }}>1</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('2')} >
            <Text style={{ color: 'black' }}>2</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('3')} >
            <Text style={{ color: 'black' }}>3</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('4')} >
            <Text style={{ color: 'black' }}>4</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handlePress('5')} >
            <Text style={{ color: 'black' }}>5</Text>
          </Pressable>  
          <Pressable style={styles.button} onPress={() => handlePress('6')} >
            <Text style={{ color: 'black' }}>6</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('7')} >
            <Text style={{ color: 'black' }}>7</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('8')} >
            <Text style={{ color: 'black' }}>8</Text>
          </Pressable>
        </View>

        <View style={styles.row}>    
          <Pressable style={styles.button} onPress={() => handlePress('9')} >
            <Text style={{ color: 'black' }}>9</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('0')} >
            <Text style={{ color: 'black' }}>0</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('C')} >
            <Text style={{ color: 'black' }}>C</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('=')} >
            <Text style={{ color: 'black' }}>=</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handlePress('-')} >
            <Text style={{ color: 'black' }}>-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('+')} >
            <Text style={{ color: 'black' }}>+</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('*')} >
            <Text style={{ color: 'black' }}>*</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('/')} >
            <Text style={{ color: 'black' }}>/</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handlePress('.')} >
            <Text style={{ color: 'black' }}>.</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('M+')} >
            <Text style={{ color: 'black' }}>M+</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('M-')} >
            <Text style={{ color: 'black' }}>M-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('MR')} >
            <Text style={{ color: 'black' }}>MR</Text>
          </Pressable>
        </View>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Calculator;
