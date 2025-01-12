// Function to generate a random 256-bit (32-byte) key
export async function generateKey(): Promise<CryptoKey> {
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }
  
  // Function to encrypt data with AES-GCM
  export async function encryptData(data: string, key: CryptoKey): Promise<Uint8Array> {
    const encodedData = new TextEncoder().encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedData
    );
  
    // Combine IV and encrypted data into a single array
    const result = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
  
    return result;
  }
  
  // Function to decrypt data with AES-GCM
  export async function decryptData(encryptedData: Uint8Array, key: CryptoKey): Promise<string> {
    const iv = encryptedData.slice(0, 12);
    const encrypted = encryptedData.slice(12);
  
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );
  
    return new TextDecoder().decode(decrypted);
  }
  
  // Example usage
  async function exampleUsage() {
    const key = await generateKey();
  
    const plaintext = 'Hello, encryption!';
    const encryptedData = await encryptData(plaintext, key);
  
    console.log('Encrypted:', encryptedData);
  
    const decryptedText = await decryptData(encryptedData, key);
    console.log('Decrypted:', decryptedText);
  }
  
  exampleUsage();
  