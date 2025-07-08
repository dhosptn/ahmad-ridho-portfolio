// src/scripts/submitContact.ts
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function setupContactForm() {
  const form = document.getElementById(
    'contact-form'
  ) as HTMLFormElement | null;
  const formMessage = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const from_name = (form.from_name as HTMLInputElement).value.trim();
    const reply_to = (form.reply_to as HTMLInputElement).value.trim();
    const message = (form.message as HTMLTextAreaElement).value.trim();

    if (!from_name || !reply_to || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        from_name,
        reply_to,
        message,
        created_at: serverTimestamp(),
      });

      form.reset();
      form.style.display = 'none';
      formMessage?.classList.remove('hidden');
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      alert('Failed to send message.');
    }
  });
}
