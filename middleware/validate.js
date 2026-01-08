function validateSchema(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
        if (error) {
            console.log("Validation error:", error.details);
            const errors = error.details.map((d) => {
                const raw = (d.context && d.context.label) || (Array.isArray(d.path) ? d.path.join('.') : d.path) || null;
                let label = raw && String(raw);
                if (label) {
                    label = label.replace(/_/g, ' ');
                    label = label.replace(/\b\w/g, (c) => c.toUpperCase());
                }
                let msg = d.message || '';
                // remove quotes/backticks and other surrounding symbols
                msg = msg.replace(/["`]+/g, '');
                // replace raw field name with human label when present
                if (raw && typeof raw === 'string') {
                    try {
                        const re = new RegExp(`\\b${raw}\\b`, 'g');
                        msg = msg.replace(re, label || raw);
                    } catch (e) {
                        // ignore regex errors
                    }
                }
                // ensure sentence case
                if (msg && typeof msg === 'string') msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                return { label: label || null, message: msg };
            });
            return res.status(400).json({ success: false, errors });
        } else {
            req.body = value;
            return next();
        }

    };
}

module.exports = validateSchema;
