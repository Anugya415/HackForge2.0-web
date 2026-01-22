import { ChatService } from '../services/chat.service.js';

export class ChatController {
    static async processMessage(req, res) {
        try {
            const { message, history } = req.body;

            if (!message) {
                return res.status(400).json({ error: 'Message is required' });
            }

            const response = await ChatService.getChatResponse(message, history || []);

            res.json({
                response,
                sender: 'bot',
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Chat Controller Error:', error);
            res.status(500).json({ error: error.message || 'Failed to get AI response' });
        }
    }
}
