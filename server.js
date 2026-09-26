const express = require('express');
const { chromium } = require('playwright');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// نقطة نهاية للتحقق من عمل الخادم
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'azr-backend' });
});

// نقطة نهاية لاستقبال الطلبات من الإضافة
app.post('/api/v1/azr/chat', async (req, res) => {
    try {
        const { message, token, projectId, licenseKey } = req.body;

        if (!message) {
            return res.status(400).json({ ok: false, error: 'MESSAGE_REQUIRED' });
        }

        // هنا يتم تنفيذ العملية الفعلية باستخدام Playwright
        // (هذا مثال مبسط - يمكنك توسيعه لاحقًا)
        
        console.log(`[AZR] Received prompt: ${message.substring(0, 50)}...`);
        console.log(`[AZR] Project: ${projectId || 'N/A'}`);
        console.log(`[AZR] License: ${licenseKey ? 'provided' : 'none'}`);

        // محاكاة معالجة ناجحة
        setTimeout(() => {
            res.status(202).json({
                ok: true,
                accepted: true,
                requestId: 'azr_' + Date.now(),
                message: 'Request accepted and queued for processing'
            });
        }, 500);

    } catch (error) {
        console.error('[AZR] Error:', error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// نقطة نهاية للتحقق من حالة الطلب
app.get('/api/v1/azr/status/:requestId', (req, res) => {
    res.json({ ok: true, requestId: req.params.requestId, status: 'completed' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AZR] Backend running on port ${PORT}`);
});
