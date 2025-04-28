import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
// Importa i componenti di React Native
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Occupa tutto lo schermo
    justifyContent: 'center',  // Centra verticalmente
    alignItems: 'center',      // Centra orizzontalmente
    backgroundColor: '#afc4df', // Sfondo azzurro chiaro
  },
  calc: {
    backgroundColor: 'white',  // Sfondo bianco della calcolatrice
    borderRadius: 10,          // Angoli arrotondati
    padding: 20,               // Spaziatura interna
  },
  input: {
    height: 40,                // Altezza 
    borderColor: 'gray',       // Colore del bordo grigio
    borderWidth: 1,            // Spessore bordo
    borderRadius: 5,           // Angoli arrotondati
    paddingHorizontal: 10,     // Spaziatura orizzontale interna
    marginTop: 10,             // Margine superiore
  },
  row: {
    marginTop: 10,             // Margine sopra ogni riga di bottoni
    flexDirection: 'row',      // Disposizione in riga
    justifyContent: 'space-between', // Spaziatura uniforme
  },
  button: {
    backgroundColor: 'lightgray', // Sfondo grigio chiaro 
    padding: 15,                 // Spaziatura interna
    borderRadius: 5,             // Angoli arrotondati
    width: '22%',                // Larghezza del bottone
    alignItems: 'center',        // Centrare testo nel bottone
  },
  button2: {
    backgroundColor: 'lightskyblue', // Sfondo azzurro chiaro 
    padding: 15,
    borderRadius: 5,
    width: '22%',
    alignItems: 'center',
  },
  button3: {
    backgroundColor: 'lightsteelblue', // Sfondo azzurro grigio 
    padding: 15,
    borderRadius: 5,
    width: '22%',
    alignItems: 'center',
  },
  button4: {
    backgroundColor: 'lightcoral', // Sfondo rosso 
    padding: 15,
    borderRadius: 5,
    width: '22%',
    alignItems: 'center',
  },
});

// Funzione principale 
const Calc = () => {
  const [input, setInput] = useState(''); // Stato per l'input digitato
  const [ris, setRis] = useState('');     // Stato per il risultato
  const [memory, setMemory] = useState(0); // Stato per la memoria

  // Gestore per quando premi un bottone
  const handlePress = (value) => {
    if (value === '=') {
      try {
        // Divide l'input tra numeri e operatori
        const membri = input.split(/([+\-*/])/);

        // Prima risolve le moltiplicazioni e le divisioni
        for (let i = 1; i < membri.length; i+=2) {
          const segno = membri[i];
          const succ = parseFloat(membri[i + 1]);
          const prec = parseFloat(membri[i - 1]);
          let r;

          if (segno === '*') {
            r = prec * succ;
            membri.splice(i - 1, 3, r.toString()); // Sostituisce il pezzo calcolato
            i -= 2;
          } else if (segno === '/') {
            r = prec / succ;
            membri.splice(i - 1, 3, r.toString());
            i -= 2;
          }
        }

        // Poi risolve le addizioni e le sottrazioni
        let ris = parseFloat(membri[0]);
        for (let i = 1; i < membri.length; i += 2) {
          const segno = membri[i];
          const succ = parseFloat(membri[i + 1]);
          if (segno === '+') ris += succ;
          else if (segno === '-') ris -= succ;
        }

        // Imposta il risultato
        setRis(ris.toString());

      } catch (error) {
        setRis('Error'); 
      }
    } else if (value === 'C') {
      // Reset
      setInput('');
      setRis('');
    } else if (value === 'MS') {
      // Memorizza il risultato o l'input
      setMemory(parseFloat(ris || input) || 0);
    } else if (value === 'MR') {
      // Richiama la memoria
      setInput(memory.toString());
      setRis('');
    } else if (value === 'M+') {
      // Somma alla memoria
      setMemory(prev => prev + (parseFloat(ris || input) || 0));
    } else if (value === 'M-') {
      // Sottrae dalla memoria
      setMemory(prev => prev - (parseFloat(ris || input) || 0));
    } else if (value === 'UNDO') {
      // Cancella l'ultimo carattere
      setInput((prev) => prev.slice(0, -1));
    } else {
      // Aggiunge un numero o operatore
      if(ris) {
        setInput(value); // Se c'era un risultato, ricomincia da capo
        setRis('');
      } else {  
        setInput((prev) => prev + value); // Continua a scrivere
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.calc}>
        {/* Campo input, non modificabile a mano */}
        <TextInput style={styles.input} editable={false} placeholder="0" value={ris || input} />
        
        {/* Riga bottoni 1,2,3,+ */}
        <View style={styles.row}>
          {/* Bottone 1 */}
          <Pressable style={styles.button} onPress={() => handlePress('1')} >
            <Text style={{ color: 'black' }}>1</Text>
          </Pressable>
          {/* Bottone 2 */}
          <Pressable style={styles.button} onPress={() => handlePress('2')} >
            <Text style={{ color: 'black' }}>2</Text>
          </Pressable>
          {/* Bottone 3 */}
          <Pressable style={styles.button} onPress={() => handlePress('3')} >
            <Text style={{ color: 'black' }}>3</Text>
          </Pressable>
          {/* Bottone + */}
          <Pressable style={styles.button2} onPress={() => handlePress('+')} >
            <Text style={{ color: 'black' }}>+</Text>
          </Pressable>
        </View>

        {/* Riga bottoni 4,5,6,- */}
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handlePress('4')} >
            <Text style={{ color: 'black' }}>4</Text>
          </Pressable>  
          <Pressable style={styles.button} onPress={() => handlePress('5')} >
            <Text style={{ color: 'black' }}>5</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('6')} >
            <Text style={{ color: 'black' }}>6</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() => handlePress('-')} >
            <Text style={{ color: 'black' }}>-</Text>
          </Pressable>
        </View>

        {/* Riga bottoni 7,8,9,* */}
        <View style={styles.row}>    
          <Pressable style={styles.button} onPress={() => handlePress('7')} >
            <Text style={{ color: 'black' }}>7</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('8')} >
            <Text style={{ color: 'black' }}>8</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('9')} >
            <Text style={{ color: 'black' }}>9</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() => handlePress('*')} >
            <Text style={{ color: 'black' }}>*</Text>
          </Pressable>
        </View>

        {/* Riga bottoni .,0,=,/ */}
        <View style={styles.row}>
          <Pressable style={styles.button2} onPress={() => handlePress('.')} >
            <Text style={{ color: 'black' }}>.</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handlePress('0')} >
            <Text style={{ color: 'black' }}>0</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() => handlePress('=')} >
            <Text style={{ color: 'black' }}>=</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() => handlePress('/')} >
            <Text style={{ color: 'black' }}>/</Text>
          </Pressable>
        </View>

        {/* Riga bottoni memoria MS, M+, M-, MR */}
        <View style={styles.row}>
          <Pressable style={styles.button3} onPress={() => handlePress('MS')} >
            <Text style={{ color: 'black' }}>MS</Text>
          </Pressable>
          <Pressable style={styles.button3} onPress={() => handlePress('M+')} >
            <Text style={{ color: 'black' }}>M+</Text>
          </Pressable>
          <Pressable style={styles.button3} onPress={() => handlePress('M-')} >
            <Text style={{ color: 'black' }}>M-</Text>
          </Pressable>
          <Pressable style={styles.button3} onPress={() => handlePress('MR')} >
            <Text style={{ color: 'black' }}>MR</Text>
          </Pressable>
        </View>

        {/* Riga bottoni C e UNDO */}
        <View style={styles.row}>
          <Pressable style={styles.button4} onPress={() => handlePress('C')} >
            <Text style={{ color: 'black' }}>C</Text>
          </Pressable>
          <Pressable style={styles.button4} onPress={() => handlePress('UNDO')} >
            <Text style={{ color: 'black' }}>UNDO</Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
};

export default Calc;
