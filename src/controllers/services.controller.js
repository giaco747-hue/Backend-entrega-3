import ServiceManager from '../managers/ServiceManager.js';
const serviceManager = new ServiceManager();

export const getServices = async (req, res) => {
    try {
        const { category, available } = req.query;
        let services = await serviceManager.getServices();
        
        if (category) {
            services = services.filter(s => s.category === category);
        }
        if (available) {
            const isAvailable = available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }
        
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const service = await serviceManager.getServiceById(id);
        
        if (!service) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
};

export const createService = async (req, res) => {
    try {
        const { name, description, duration, price, category, available } = req.body;
        
        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios. Se requiere: name, description, duration, price, category y available.'
            });
        }
        
        const createdService = await serviceManager.addService(req.body);
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
};