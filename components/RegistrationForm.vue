<template>
  <div class="registrarion-form card flex justify-content-center">
    <div class="form-container">
      <h2>Регистрация</h2>

      <div class="p-fluid">
        <!-- Имя пользователя -->
        <div class="field">
          <label for="username">Имя пользователя</label>
          <InputText
            id="username"
            placeholder="Введите имя пользователя"
            :class="{ 'p-invalid': errors?.username }"
            v-model="userData.username"
          />
          <small class="p-error">{{ errors?.username }}</small>
        </div>

        <!-- Email -->
        <div class="field">
          <label for="email">Email</label>
          <InputText
            id="email"
            placeholder="Введите email"
            :class="{ 'p-invalid': errors?.email }"
            v-model="userData.email"
          />
          <small class="p-error">{{ errors?.email }}</small>
        </div>

        <!-- Пароль -->
        <div class="field">
          <label for="password">Пароль</label>
          <Password
            id="password"
            placeholder="Введите пароль"
            :feedback="false"
            :class="{ 'p-invalid': errors?.password }"
            v-model="userData.password"
            toggleMask
          />
          <small class="p-error">{{ errors?.password }}</small>
        </div>

        <!-- Подтверждение пароля -->
        <div class="field">
          <label for="confirmPassword">Подтвердите пароль</label>
          <Password
            id="confirmPassword"
            placeholder="Повторите пароль"
            :feedback="false"
            :class="{ 'p-invalid': errors?.confirmPassword }"
            v-model="userData.confirmPassword"
            toggleMask
          />
          <small class="p-error">{{ errors?.confirmPassword }}</small>
        </div>

        <!-- Чекбокс условий -->
        <div class="field-checkbox">
          <Checkbox
            id="acceptTerms"
            :class="{ 'p-invalid': errors?.acceptTerms }"
            v-model="userData.acceptTerms"
            :binary="true"
          />
          <label for="acceptTerms">Я принимаю условия пользования</label>
          <small class="p-error block">{{ errors?.acceptTerms }}</small>
        </div>

        <!-- Кнопка отправки -->
        <Button
          type="submit"
          label="Зарегистрироваться"
          class="mt-3"
          :loading="isSubmitting"
          @click="handleSubmit"
        />
      </div>

      <!-- Сообщение об успехе -->
      <Message v-if="registrationSuccess" severity="success">
        Регистрация прошла успешно!
      </Message>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAccessToken } from "~/stores/accessToken";

const accessTokenStore = useAccessToken();

const errors = reactive<Record<string, string | boolean>>({});

const isSubmitting = ref(false);
const registrationSuccess = ref(false);

const userData = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const validateForm = () => {
  let isValid = true;

  // Сброс ошибок
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  // Валидация имени пользователя
  if (!userData.username.trim()) {
    errors.username = "Имя пользователя обязательно";
    isValid = false;
  }

  // Валидация email
  if (!userData.email.trim()) {
    errors.email = "Email обязателен";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
    errors.email = "Введите корректный email";
    isValid = false;
  }

  // Валидация пароля
  if (!userData.password) {
    errors.password = "Пароль обязателен";
    isValid = false;
  } else if (userData.password.length < 6) {
    errors.password = "Пароль должен быть не менее 6 символов";
    isValid = false;
  }

  // Подтверждение пароля
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
    isValid = false;
  }

  // Условия использования
  if (!userData.acceptTerms) {
    errors.acceptTerms = "Необходимо принять условия";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  // Валидация перед отправкой
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const response: Record<string, string> = await $fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        body: userData,
      }
    );

    console.log("response: ", response);
    registrationSuccess.value = true;

    accessTokenStore.setAccessToken(response.accessToken);
    const accessToken = accessTokenStore.getAccessToken;

    console.log("accessToken: ", accessToken);
    
    // Устанавливаем refreshToken в куки
    document.cookie = `refreshToken=${response.refreshToken}; Path=/; Secure; SameSite=Strict`;
  } catch (error: any) {
    if (error.data?.message) {
      alert(error.data.message);
    }
  }

  isSubmitting.value = false;
};
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

.field {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 8px;
  }
}

.field-checkbox {
  margin: 1.5rem 0;

  .p-checkbox {
    margin-right: 8px;
  }
}

.p-error {
  display: block;
  margin-top: 8px;
  color: var(--p-red-400);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}
</style>
