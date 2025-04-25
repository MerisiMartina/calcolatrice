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
  calc: {
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

const Calc = () => {
  const [input, setInput] = useState('');
  const [ris, setRis] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
      const membri = input.split(/([+\-*/])/); 

      for (let i = 1; i < membri.length; i+=2) {
        const segno = membri[i];
        const succ = parseFloat(membri[i + 1]);
        const prec = parseFloat(membri[i - 1]);
        let r;

        if (segno === '*') {
          r = prec * succ;
          membri.splice(i - 1, 3, r.toString());
          i -= 2;
        } else if (segno === '/') {
          r = prec / succ;
          membri.splice(i - 1, 3, r.toString());
          i -= 2;
        }
        
      }

      let ris = parseFloat(membri[0]);

      for (let i = 1; i < membri.length; i += 2) {
        const segno = membri[i];
        const succ = parseFloat(membri[i + 1]);
        if (segno === '+') ris += succ;
        else if (segno === '-') ris -= succ;
      }

      setRis(ris.toString());

      }
      catch (error) {
        setRis('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setRis('');
    }
    else {
      setInput((prev) => prev + value);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.calc}>
        <Text>Calcolatrice</Text>
        <TextInput style={styles.input} editable={false} placeholder="0" value={ris || input} />
        
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

export default Calc;
