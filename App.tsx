import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Keyboard } from 'react-native';

export default function App() {
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessCount, setGuessCount] = useState(0);

  const handleGuess = () => {
    const numericGuess = parseInt(guess);
    if (isNaN(numericGuess)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setGuessCount(prev => prev + 1);

    if (numericGuess < secretNumber) {
      setFeedback('Too low! Try again.');
    } else if (numericGuess > secretNumber) {
      setFeedback('Too high! Try again.');
    } else {
      setFeedback('Congratulations! You guessed the correct number' );
      Keyboard.dismiss();
    }

    setGuess('');
  };

  const restartGame = () => {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setGuessCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mystery Number Challenge</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your guess (1-100)"
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
      />

      <TouchableHighlight style={styles.button} onPress={handleGuess} underlayColor='#005999'>
        <Text style={styles.buttonText}>Submit Guess</Text>
      </TouchableHighlight>

      <Text style={styles.feedback}>{feedback}</Text>
      <Text style={styles.count}>Total Guesses: {guessCount}</Text>

      <TouchableHighlight style={styles.restartButton} onPress={restartGame} underlayColor='#aaa'>
        <Text style={styles.restartText}>Restart Game</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1f5fe',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#0277bd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0288d1',
    padding: 15,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  count: {
    fontSize: 16,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#b0bec5',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  restartText: {
    color: '#263238',
    fontWeight: 'bold',
  },
});