import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import z from "zod";

const employeeSchema = z.object({
  firstName: z
    .string("first name has to be a string")
    .trim()
    .min(3, "first name needs at least 3 characters"),
  lastName: z
    .string("last name has to be a string")
    .trim()
    .min(3, "last name needs at least 3 characters"),
  email: z.email("invalid email address"),

  postalCode: z
    .string("Postal Code has to be a string")
    .trim()
    .regex(
      /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
      "Postal Code should be formatted like 'E1D 3D2'",
    ),
  phone: z
    .string()
    .refine((val) => val.replace(/\D/g, ""), "phone number must be 10 digits"),
});

type employForm = z.infer<typeof employeeSchema>;

const employeeForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<employForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      postalCode: "",
      phone: "",
    },
  });

  const onSubmit = async (data: employForm) => {
    try {
      // Simulate API call
      setTimeout(() => {
        Alert.alert(
          "Employee Added",
          `\n
           First Name: ${data.firstName}\n
           Last Name: ${data.lastName}\n
           Email: ${data.email}\n
           Postal Code: ${data.postalCode}\n
           Phone #: ${data.phone}`,
        );
        reset();
      }, 1000);
    } catch (error) {
      Alert.alert("Error", "An error occurred during submission process");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Employee Information</Text>
      <View style={styles.formContainer}>
        <View style={styles.formRow}>
          <Text style={styles.empInfoLabel}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                placeholder="John"
                placeholderTextColor="#d4d4d4"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
            )}
          />
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName.message}</Text>
          )}
        </View>

        <View style={styles.formRow}>
          <Text style={styles.empInfoLabel}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                placeholder="Johnson"
                placeholderTextColor="#d4d4d4"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
            )}
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName.message}</Text>
          )}
        </View>

        <View style={styles.formRow}>
          <Text style={styles.empInfoLabel}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="email@email.com"
                placeholderTextColor="#d4d4d4"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.formRow}>
          <Text style={styles.empInfoLabel}>Postal Code</Text>
          <Controller
            control={control}
            name="postalCode"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.postalCode && styles.inputError]}
                placeholder="A1A 2B2"
                placeholderTextColor="#d4d4d4"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
            )}
          />
          {errors.postalCode && (
            <Text style={styles.error}>{errors.postalCode.message}</Text>
          )}
        </View>

        <View style={styles.formRow}>
          <Text style={styles.empInfoLabel}>Phone Number</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="010 010 0101"
                placeholderTextColor="#d4d4d4"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
            )}
          />
          {errors.phone && (
            <Text style={styles.error}>{errors.phone.message}</Text>
          )}
        </View>
        <Pressable style={styles.submit} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}>Add Employee</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default employeeForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#e2e2e2",
    backgroundColor: "#f8f9fa",
    padding: 20,
    paddingTop: 30,
    margin: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
    color: "black",
    textAlign: "center",
    paddingTop: StatusBar.currentHeight,
  },
  formRow: {
    padding: 16,
  },
  empInfoLabel: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  error: {
    color: "red",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#77b6ff",
    padding: 16,
    alignItems: "center",
  },
  submitText: {
    color: "black",
    fontWeight: "600",
  },
});
