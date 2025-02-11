document.getElementById('add-rule-btn').addEventListener('click', openAddModal);

    // Función para abrir el modal de añadir regla
    function openAddModal() {
      document.getElementById('add-rule-modal-overlay').style.display = 'block';
    }

    // Función para cerrar el modal de añadir regla
    function closeAddModal() {
      document.getElementById('add-rule-modal-overlay').style.display = 'none';
    }

    // Función para manejar el envío del formulario de añadir regla
    async function addRule(event) {
      event.preventDefault();

      try {
        // Usar el technician_id predeterminado de 2
        const technicianId = 93; // ID de técnico predeterminado

        // Obtener el resto de los valores del formulario
        const name = document.getElementById('add-rule-name').value;
        const cropId = document.getElementById('add-crop').value;
        const sensor = document.getElementById('add-sensor').value;
        const actuator = document.getElementById('add-actuator').value;
        const actuatorOptions = document.getElementById('add-actuator-options').value;
        const operator = document.getElementById('add-operator').value;
        const value = document.getElementById('add-value').value;
        const unit = document.getElementById('add-unit').value;

        const ruleInfo = {
          "AND": [{
            "conditions": [{
              "type": sensor,
              "value": parseFloat(value),
              "operator": operator
            }],
            "actions": [actuatorOptions],
            "sensors": [{
              "type": sensor
            }],
            "actuators": [{
              "type": actuator
            }]
          }]
        };

        // Construir los datos para enviar
        const data = {
          name: name,
          crop_id: cropId,
          technician_id: technicianId, // Usar el technician_id predeterminado
          rule_info: JSON.stringify(ruleInfo)
        };

        // Enviar la solicitud POST
        const response = await fetch('http://localhost:3000/views/rules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        window.location.href ="/views/rules";

        if (response.ok) {
          alert('Regla añadida correctamente.');
          window.location.reload();
        } else {
          const errorResponse = await response.json();
          console.error('Error al añadir la regla:', errorResponse);
          alert('No se pudo añadir la regla. Por favor, intente de nuevo.');
        }
      } catch (error) {
        console.error('Error al añadir la regla:', error);
        alert('Ocurrió un error al añadir la regla. Por favor, intente de nuevo.');
      }
    }



    // Funciones para mostrar/ocultar y actualizar las condiciones y opciones de actuador en el modal de añadir regla

    function toggleAddConditions() {
      const sensor = document.getElementById('add-sensor').value;
      const conditionsContainer = document.getElementById('add-conditions-container');
      const unitInput = document.getElementById('add-unit');

      if (sensor === 'temperatura' || sensor === 'temperatura_terreno') {
        conditionsContainer.style.display = 'block';
      } else if (sensor === 'humedad' || sensor === 'humedad_terreno') {
        conditionsContainer.style.display = 'block';
      } else {
        conditionsContainer.style.display = 'none';
      }
    }

    function updateAddActuatorOptions(selectedOption = '', actuator = '') {
      let selectedActuator = actuator || document.getElementById('add-actuator').value;
      let options = [];

      switch (selectedActuator) {
        case 'riego':
          options = [{
              value: 'activar_riego',
              label: 'Activar riego'
            },
            {
              value: 'desactivar_riego',
              label: 'Desactivar riego'
            }
          ];
          break;
        case 'ventilacion':
          options = [{
              value: 'activar_ventilacion',
              label: 'Activar ventilación'
            },
            {
              value: 'desactivar_ventilacion',
              label: 'Desactivar ventilación'
            }
          ];
          break;
        case 'cobertura_cultivos':
          options = [{
              value: 'cubrir_lona_semi_transparente',
              label: 'Cubrir cultivos con lona semi-transparente'
            },
            {
              value: 'cubrir_lona_opaca',
              label: 'Cubrir cultivos con lona opaca'
            },
            {
              value: 'destapar_cultivos',
              label: 'Destapar cultivos'
            }
          ];
          break;
        case 'apertura_ventanas':
          options = [{
              value: 'abrir_ventanas',
              label: 'Abrir ventanas'
            },
            {
              value: 'cerrar_ventanas',
              label: 'Cerrar ventanas'
            }
          ];
          break;
        default:
          options = [];
      }

      // Limpiar las opciones actuales
      const actuatorOptionsSelect = document.getElementById('add-actuator-options');
      actuatorOptionsSelect.innerHTML = '';

      // Añadir las nuevas opciones
      options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        actuatorOptionsSelect.appendChild(opt);
      });

      // Establecer la opción preseleccionada
      if (selectedOption) {
        actuatorOptionsSelect.value = selectedOption;
      }
    }

    async function updateRule(event) {
      event.preventDefault();

      const ruleId = ruleIdToEdit;
      const cropId = document.getElementById('crop').value;
      const sensor = document.getElementById('sensor').value;
      const actuator = document.getElementById('actuator').value;
      const actuatorOptions = document.getElementById('actuator-options').value;
      const operator = document.getElementById('operator').value;
      const value = document.getElementById('value').value;
      const unit = document.getElementById('unit').value;

      const ruleInfo = {
        "AND": [{
          "conditions": [{
            "type": sensor,
            "value": parseFloat(value),
            "operator": operator
          }],
          "actions": [actuatorOptions],
          "sensors": [{
            "type": sensor
          }],
          "actuators": [{
            "type": actuator
          }]
        }]
      };

      const data = {
        crop_id: cropId,
        rule_info: JSON.stringify(ruleInfo),
      };

      try {
        const response = await fetch(`http://localhost:3000/views/rules/${ruleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        window.location.href ="/views/rules";

        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Error al actualizar la regla');
        }
      } catch (error) {
        console.error('Error al actualizar la regla:', error);
      }
    }

    document.getElementById('actuator').addEventListener('change', function() {
      updateActuatorOptions();
    });

    function openEditModal(ruleId, cropId, sensor, actuator, actuatorOptions) {
      ruleIdToEdit = ruleId;
      document.getElementById('crop').value = cropId;
      document.getElementById('sensor').value = sensor;
      document.getElementById('actuator').value = actuator;
      updateActuatorOptions(actuatorOptions, actuator); // Asegurarse de que las opciones se actualicen correctamente
      updateConditions(sensor);
      document.getElementById('edit-rule-modal-overlay').style.display = 'block';
    }

    let ruleIdToDelete = null;

    function openModal(ruleId) {
      ruleIdToDelete = ruleId;
      document.getElementById('view-existing-rule-modal-overlay').style.display = 'block';
    }

    function closeModal() {
      document.getElementById('view-existing-rule-modal-overlay').style.display = 'none';
      ruleIdToDelete = null;
    }

    document.getElementById('confirmDelete').addEventListener('click', handleDelete);

    async function handleDelete() {
      if (!ruleIdToDelete) return;
      try {
        const response = await fetch(`http://localhost:3000/views/rules/${ruleIdToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          closeModal();
          window.location.reload();
        } else {
          console.error('Error al eliminar la regla');
        }
      } catch (error) {
        console.error('Error al eliminar la regla:', error);
      }
    }

    // Función para cerrar el modal de edición
    function closeEditModal() {
      document.getElementById('edit-rule-modal-overlay').style.display = 'none';
      ruleIdToEdit = null;
    }

    // Función para actualizar las opciones del actuador
    function updateActuatorOptions(selectedOption = '', actuator = '') {
      let selectedActuator = actuator || document.getElementById('actuator').value;
      let options = [];

      switch (selectedActuator) {
        case 'riego':
          options = [{
              value: 'activar_riego',
              label: 'Activar riego'
            },
            {
              value: 'desactivar_riego',
              label: 'Desactivar riego'
            },
          ];
          break;
        case 'ventilacion':
          options = [{
              value: 'activar_ventilacion',
              label: 'Activar ventilación'
            },
            {
              value: 'desactivar_ventilacion',
              label: 'Desactivar ventilación'
            },
          ];
          break;
        case 'cobertura_cultivos':
          options = [{
              value: 'cubrir_lona_semi_transparente',
              label: 'Cubrir cultivos con lona semi-transparente'
            },
            {
              value: 'cubrir_lona_opaca',
              label: 'Cubrir cultivos con lona opaca'
            },
            {
              value: 'destapar_cultivos',
              label: 'Destapar cultivos'
            },
          ];
          break;
        case 'apertura_ventanas':
          options = [{
              value: 'abrir_ventanas',
              label: 'Abrir ventanas'
            },
            {
              value: 'cerrar_ventanas',
              label: 'Cerrar ventanas'
            },
          ];
          break;
        default:
          options = [];
      }

      // Limpiar las opciones actuales
      const actuatorOptionsSelect = document.getElementById('actuator-options');
      actuatorOptionsSelect.innerHTML = '';

      // Añadir las nuevas opciones
      options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        actuatorOptionsSelect.appendChild(opt);
      });

      // Establecer la opción preseleccionada
      if (selectedOption) {
        actuatorOptionsSelect.value = selectedOption;
      }
    }


    // Función para mostrar/ocultar el contenedor de condiciones
    function toggleConditions() {
      const sensor = document.getElementById('sensor').value;
      updateConditions(sensor);
    }

    // Función para actualizar las condiciones basadas en el sensor
    function updateConditions(sensor) {
      const conditionsContainer = document.getElementById('conditions-container');
      const unitInput = document.getElementById('unit');

      if (sensor === 'temperatura' || sensor === 'temperatura_terreno') {
        conditionsContainer.style.display = 'block';
      } else if (sensor === 'humedad' || sensor === 'humedad_terreno') {
        conditionsContainer.style.display = 'block';
      } else {
        conditionsContainer.style.display = 'none';
      }
    }