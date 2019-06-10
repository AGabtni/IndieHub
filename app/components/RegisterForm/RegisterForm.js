import strings from "./strings";
import styles from "./styles";
import { strings as registerStrings } from "../../screens/Register";
import { Formik, FormikActions, FormikProps } from "formik";
import React, { Component } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import { object as yupObject, ref as yupRef, string as yupString } from "yup";
import deviceStorage from '../../src/services/deviceStorage';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default class LoginForm extends Component<NavigationScreenProps> {
  constructor(props) {
    super(props);
    this.state = {
      loadingToken: true
    };

    this.finishLoading = this.finishLoading.bind(this);



  };

  finishLoading(){

    this.setState({
      loadingToken : false

    })
  }







  handleRegister = (values: FormValues) => {
    fetch('http://192.168.0.153:8000/api/user',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: 'Agabt03',
          password: values.password,
          email: values.email,
        }),
      }
    )
    .then((response) => response.json())
    .then((responseJson)=> {

      const token = responseJson.accessToken;
      if(responseJson.auth){

        if(token.length >0){
          console.warn('HERE ');
          deviceStorage.saveItem("id_token", token);

        }
      }

    })
    .catch((error) => {
      console.error(error);
    });


  };


  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    formikBag.setSubmitting(true);
    if (values.email != values.password) {
      this.handleRegister(values);

      setTimeout(() => {
        formikBag.setSubmitting(false);
        this.props.navigation.navigate("AuthLoading");
      }, 3000
    );
    }
  };

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isValid,
    isSubmitting
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <Input
        placeholder={strings.emailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={value => setFieldValue("email", value)}
        onBlur={() => setFieldTouched("email")}
        editable={!isSubmitting}
        errorMessage={touched.email && errors.email ? errors.email : undefined}
      />
      <Input
        placeholder={strings.password}
        secureTextEntry
        autoCapitalize="none"
        value={values.password}
        onChangeText={value => setFieldValue("password", value)}
        onBlur={() => setFieldTouched("password")}
        editable={!isSubmitting}
        errorMessage={touched.password && errors.password ? errors.password : undefined}
      />
      <Input
        placeholder={strings.confirmPassword}
        secureTextEntry
        autoCapitalize="none"
        value={values.confirmPassword}
        onChangeText={value => setFieldValue("confirmPassword", value)}
        onBlur={() => setFieldTouched("confirmPassword")}
        editable={!isSubmitting}
        errorMessage={
          touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined
        }
      />
      <View style={styles.buttonContainer}>
        <Button
          title={registerStrings.registerTitle}
          containerStyle={styles.registerButtonContainer}
          buttonStyle={styles.registerButton}
          disabledStyle={styles.disabled}
          titleStyle={styles.registerButtonTitle}
          disabledTitleStyle={styles.registerButtonTitle}
          onPress={handleSubmit}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          loadingProps={{ size: "large", color: "white" }}
        />

      </View>

    </View>
  )
;

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values: FormValues, formikBag: FormikActions<FormValues>) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email(strings.invalidEmailFormat)
            .required(strings.emailRequired),
          password: yupString()
            .min(8, strings.passwordMinLength)
            .required(strings.passwordRequired),
          confirmPassword: yupString()
            .oneOf([yupRef("password", undefined)], strings.passwordMismatch)
            .required(strings.confirmPasswordRequired)
        })}
        render={(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
      />
    );
  }
}
