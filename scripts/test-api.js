// Simple script to test API connection

require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function testApiConnection() {
  console.log(`Testing API connection to: ${API_URL}`);
  
  try {
    // Try to connect to the API health endpoint
    const response = await fetch(`${API_URL}/health`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API connection successful!');
      console.log('Response:', data);
    } else {
      console.error(`❌ API connection failed with status: ${response.status}`);
      console.error('Error:', await response.text());
    }
  } catch (error) {
    console.error('❌ API connection failed:');
    console.error(error.message);
    console.log('\nPossible reasons:');
    console.log('1. API server is not running');
    console.log('2. API URL is incorrect in .env file');
    console.log('3. Network connectivity issues');
    console.log('\nPlease check your .env file and make sure the API server is running.');
  }
}

testApiConnection();